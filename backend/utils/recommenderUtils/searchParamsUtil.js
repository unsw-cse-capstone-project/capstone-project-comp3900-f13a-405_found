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

// @desc:    Gets a list of shows to search given its spotify ShowId
// @inputs:  showIds - list of spotify ShowIDs
// @outputs: searchParams - list of objects {name, publisher}
SearchParams.prototype.getSearchParams = async function (showIds) {
  var SearchParams = await getShowsList(showIds);
  return SearchParams;
};

module.exports = SearchParams;
