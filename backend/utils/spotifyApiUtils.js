const config = require("config");
const axios = require("axios");
const qs = require("querystring");

global.SPOTIFY_ACCESS_TOKEN = "";

const getAccessTokenFromSpotify = async () => {
  try {
    const uri = encodeURI(`https://accounts.spotify.com/api/token`);

    clientIdClientSecretB64 = Buffer.from(
      `${config.get("spotifyClientId")}:${config.get("spotifyClientSecret")}`
    ).toString("base64");

    const headers = {
      "user-agent": "node.js",
      Authorization: `Basic ${clientIdClientSecretB64}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const requestBody = {
      grant_type: "client_credentials",
    };

    const spotifyResponse = await axios.post(uri, qs.stringify(requestBody), {
      headers,
    });

    // this is global, access this anywhere
    SPOTIFY_ACCESS_TOKEN = spotifyResponse.data.access_token;
  } catch (err) {
    console.error(err.message);
  }
};

const updateAccessTokenPeriodically = async () => {
  getAccessTokenFromSpotify();

  // spotify access token expires in 1 hour, so we'll refresh it every
  // 30 mins
  setInterval(getAccessTokenFromSpotify, 60 * 60 * 30);
};

module.exports = updateAccessTokenPeriodically;
