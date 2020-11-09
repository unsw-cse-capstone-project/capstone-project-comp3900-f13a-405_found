// Utility methods for finding equivalent spotify ids given a podcast title and publisher.
const axios = require("axios");
const lodash = require("lodash");

var SpotifyUtil = function () {};

const matchSpotifyRec = async function (listenNotesRec) {
  try {
    if (typeof listenNotesRec == "undefined") return;
    const uri = encodeURI(
      `https://api.spotify.com/v1/search?query="${listenNotesRec.title}"&type=show&include_external=audio&market=AU&offset=0&limit=20`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    const spotifyResponse = await axios.get(uri, { headers });
    if (spotifyResponse.data.shows.items.total == 0) return;
    const show = lodash.find(spotifyResponse.data.shows.items, {
      name: `${listenNotesRec.title}`,
      publisher: `${listenNotesRec.publisher}`,
    });
    return show;
  } catch (err) {
    console.error(err.message);
  }
};

const matchSpotifyRecs = async function (listenNotesRecs) {
  const spotifyRecs = [];
  for (listenNotesRec of listenNotesRecs) {
    var spotifyRec = await matchSpotifyRec(listenNotesRec);
    spotifyRecs.push(spotifyRec);
  }
  const filteredRecs = lodash.compact(spotifyRecs);
  return filteredRecs;
};

SpotifyUtil.prototype.getMatchedSpotifyRecs = async function (listenNotesRecs) {
  const spotifyRecs = matchSpotifyRecs(listenNotesRecs);
  return spotifyRecs;
};

SpotifyUtil.prototype.getRecommendationsForNewUsers = async function () {
  try {
    const uri = encodeURI(
      "https://api.spotify.com/v1/search?q=top%20podcasts&type=show&market=AU"
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    const spotifyResponse = await axios.get(uri, { headers });
    console.log(spotifyResponse.data.shows.items.length);
    return spotifyResponse.data.shows.items;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = SpotifyUtil;
