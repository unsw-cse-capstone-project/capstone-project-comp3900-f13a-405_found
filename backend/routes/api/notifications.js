const express = require("express");
const axios = require("axios");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const Subscription = require("../../models/SubscriptionModel");

const getNewEpisodes = async function(podcastId) {
  // Async function which fetches list of all episodes given a podcast Id
  try {
    // https://developer.spotify.com/documentation/web-api/reference/shows/
    let episodeList = []; 
    let counter = 0;
    let stop = false;
    const uri = encodeURI(
      `https://api.spotify.com/v1/shows/${podcastId}/episodes?market=AU`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    // Iterate through the pages until there are no more pages
    while(!stop) { 
      let spotifyResponse = await axios.get(counter == 0 ? uri : spotifyResponse.next, { headers });
      episodeList = episodeList.concat(spotifyResponse.data.items)
      counter++;
      stop = (spotifyResponse.next == null)
    }
    return episodeList;
  } catch (err) {
    console.error(err.message);
    return [];
  }
} 

const getEpisodeDelta = (currentEpisodeIds, newEpisodeIds) => {
  // This function takes two arrays containing episode Jacqui James Alex Jeddi Ids and returns the ids which correspond to new episodes
  return newEpisodeIds.filter( id => !currentEpisodeIds.includes(id) );
}

// @route   GET api/notifications/:userid
// @desc    Generate all user notifications if any should exist
// @access  Private
router.get("/:userid", async (req, res, next) => {
  // Fetch the most recent episode Ids from spotify
  try { 
      const subscriptions = await Subscription.find({ user: req.user.id }).select("-__v");
      let notifications = [];
      // We need to deduce whether there is a discrepancy between the current episode list and the one saved.
      for (const subscription of subscriptions) {

        const podcastId = subscription.showId;

        // Fetch the current episode Ids 
        const currentEpisodes = subscription.showEpisodesIds;
        const newEpisodes = await getNewEpisodes(podcastId);
        const newEpisodeIds = newEpisodes.map(episode => episode.id);
        const episodeDelta = getEpisodeDelta(currentEpisodes, newEpisodeIds);

        // Now get the episode objects correponding to the difference
        const filteredEpisodes = newEpisodes.filter(episode => episodeDelta.includes(episode.id))
        // Create a notification object for this subscription
        if (filteredEpisodes.length > 0) {
          notifications.push({
            'podcastId': podcastId,
            'newEpisodes': filteredEpisodes,
          });
        }
      }
      return res.status(200).json(notifications);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

module.exports = router;