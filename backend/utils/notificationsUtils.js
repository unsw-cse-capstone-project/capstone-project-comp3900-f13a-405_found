const axios = require("axios");
const Subscription = require("../models/SubscriptionModel");
const User = require("../models/UserModel");
const mailer = require("nodemailer");
const config = require("config");

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
  // This function takes two arrays containing episode Ids and returns the ids which correspond to new episodes
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

const sendEmailForNotifications = async () => {
  try {
    const user = await User.find({ optInEmail: true });

    for (const userDocument of user) {
      const userNotifications = await getUserNotification(userDocument.id);
      let emailBody = `Hi ${userDocument.name},<br>`;
      if (userNotifications.length <= 0) continue;

      for (const item of userNotifications) {
        emailBody += `<div> <div> New episodes in ${item.podcastTitle}: </div>`;

        episodeNameList = item.newEpisodes.map((item) => item.name);
        let formattedHtml = "<ul>";
        for (const name of episodeNameList) {
          formattedHtml += `<li>${name}</li>`;
        }
        formattedHtml += "</ul>";

        emailBody += `<div> ${formattedHtml} </div> </div>`;
      }

      let body = {
        from: `ultraCast <${config.get("email_account")}>`,
        to: userDocument.email,
        subject: "New episodes from your subscriptions!",
        html: `${emailBody}`,
      };
      const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get("email_account"),
          pass: config.get("email_password"),
        },
      });
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
      transporter.sendMail(body, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        console.log("email sent");
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const checkAndSendEmailEveryOneHour = () => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // FOR DEMO PURPOSE ONLY, SEND EMAIL ON START UP
  // ONLY UNCOMMENT IF YOU WANT TO TEST THE EMAIL
  // IF NOT, EVERYTIME YOU SAVE, IT WILL SEND AN EMAIL
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // sendEmailForNotifications();

  setInterval(sendEmailForNotifications, 60 * 60 * 1000);
};

module.exports = {
  getNewEpisodes,
  getEpisodeDelta,
  getUserNotification,
  checkAndSendEmailEveryOneHour,
};
