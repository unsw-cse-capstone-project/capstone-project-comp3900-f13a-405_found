const axios = require("axios");
const lodash = require("lodash");

var EpisodeMatch = function () {};


const findShowId = async function (episodeId) {
  try {
    const uri = encodeURI(
      `https://api.spotify.com/v1/episodes/${episodeId}?market=AU`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    const spotifyResponse = await axios.get(uri, { headers });
    return spotifyResponse.data.show.id;
  } catch (err) {
    console.error(err.message);
  }
};

const getShowIdsFromHist = async function (history) {
  if ((history.length == 0)) return history;
  const trimmedHistory = lodash.takeRight(history, 5);
  const episodeIds = lodash.map(trimmedHistory, "episodeId");
  const matchedIds = [];
  for (episodeId of episodeIds) {
    var res = await findShowId(episodeId);
    matchedIds.push(res);
  }
  const showIds = lodash.uniq(matchedIds);
  return showIds;
};

// @desc: Returns a list of unique showIds given a list of episodeIds and showIds
// @inputs: history, subscriptions - list of episodeIds, list of showIds.
// @output: showIds: list of showIds.
EpisodeMatch.prototype.getShowIds = async function (history, subscriptions) {
  const showIdsFromHist = await getShowIdsFromHist(history);
  const showIdsFromSubs = lodash.map(subscriptions, "showId");
  const unionedShowIds = lodash.union(showIdsFromHist, showIdsFromSubs);
  const showIds = lodash.takeRight(unionedShowIds, 5);
  return showIds;
};

module.exports = EpisodeMatch;
