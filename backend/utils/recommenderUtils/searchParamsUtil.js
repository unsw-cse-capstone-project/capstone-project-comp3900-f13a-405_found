// Search Parameters Utility Methods:
// @Desc  Given a MongoDB (JSON formatted) object for history and subscription,
//        returns a list of all associated unique show ids.
const axios = require("axios");

var SearchParams = function () {};

const getShowData = async function (showId) {
  const uri = encodeURI(`https://api.spotify.com/v1/shows/${showId}?market=AU`);
  const headers = {
    "user-agent": "node.js",
    Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
  };
  const spotifyResponse = await axios.get(uri, { headers });
  var data = {
    title: `${spotifyResponse.data.name}`,
    publisher: `${spotifyResponse.data.publisher}`,
  };
  return data;
};

const getShowsList = async function (showIds) {
  var shows = [];
  for (showId of showIds) {
    var showData = await getShowData(showId);
    shows.push(showData);
  }
  return shows;
};

// @desc: Gets a list of data objects given a user's history and subscriptions
// @inputs: history, subscriptions
// @outputs: shows - [data.1, ..., data.n]
SearchParams.prototype.getSearchParams = async function (showIds) {
  var SearchParams = await getShowsList(showIds);
  return SearchParams;
};

module.exports = SearchParams;
