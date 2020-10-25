const axios = require("axios");
const Subscription = require("../models/SubscriptionModel");
const User = require("../models/UserModel");

const getNewEpisodes = async function (podcastId) {
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
    while (!stop) {
      let spotifyResponse = await axios.get(
        counter == 0 ? uri : spotifyResponse.next,
        { headers }
      );
      episodeList = episodeList.concat(spotifyResponse.data.items);
      counter++;
      stop = spotifyResponse.next == null;
    }
    return episodeList;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const getEpisodeDelta = (currentEpisodeIds, newEpisodeIds) => {
  // This function takes two arrays containing episode Jacqui James Alex Jeddi Ids and returns the ids which correspond to new episodes
  return newEpisodeIds.filter((id) => !currentEpisodeIds.includes(id));
};

const getUserNotification = async (userId) => {
  try {
    const subscriptions = await Subscription.find({
      user: userId,
    }).select("-__v");
    let notifications = [];
    // We need to deduce whether there is a discrepancy between the current episode list and the one saved.
    for (const subscription of subscriptions) {
      const podcastId = subscription.showId;

      // Fetch the current episode Ids
      const currentEpisodes = subscription.showEpisodesIds;
      const newEpisodes = await getNewEpisodes(podcastId);
      const newEpisodeIds = newEpisodes.map((episode) => episode.id);
      const episodeDelta = getEpisodeDelta(currentEpisodes, newEpisodeIds);

      // Now get the episode objects correponding to the difference
      const filteredEpisodes = newEpisodes.filter((episode) =>
        episodeDelta.includes(episode.id)
      );
      // Create a notification object for this subscription
      if (filteredEpisodes.length > 0) {
        notifications.push({
          podcastId: podcastId,
          podcastTitle: subscription.showTitle,
          subscriptionId: subscription.id,
          newEpisodes: filteredEpisodes,
        });
      }
    }
    return notifications;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// // UNTESTED ##############
const sendEmailForNotifications = async () => {
  const user = await User.find({ optInEmail: true });
  for (const userDocument of user) {
    const userNotifications = await getUserNotification(userDocument.id);
    let emailBody = "";
    // for(const )
  }
};

const checkAndSendEmailEveryOneHour = () => {
  // FOR DEMO PURPOSE ONLY, SEND EMAIL ON START UP
  // sendEmailForNotifications();

  setInterval(sendEmailForNotifications, 60 * 60 * 60);
};
// // UNTESTED ##############

module.exports = {
  getNewEpisodes,
  getEpisodeDelta,
  getUserNotification,
  checkAndSendEmailEveryOneHour,
};
