const express = require("express");
const axios = require("axios");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const Subscription = require("../../models/SubscriptionModel");

// @route   GET api/subscription/
// @desc    Get User's subscriptions
// @access  Private
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user._id,
    }).select("-__v");

    return res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

// @route   POST api/subscription/unsubscribe/:showId
// @desc    Unsubscribe based on showId
// @access  Private
router.post("/unsubscribe/:showId", async (req, res) => {
  try {
    const subscriptions = await Subscription.deleteOne({
      user: req.user._id,
      showId: req.params.showId,
    });
    if (subscriptions.deletedCount <= 0) {
      return res.status(400).json({ Success: false });
    }
    return res.status(200).json({ Success: true });
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

// @route   GET api/subscription/count/:ids
// @desc    Get sub count on the system based on a list of ids, ids
//          is a comma separated values of show ids
// @access  Private
router.get("/count/:ids", async (req, res) => {
  try {
    const listOfIds = req.params.ids.split(",").filter((id) => id.length > 0);
    const subsResults = [];
    for (let i = 0; i < listOfIds.length; i++) {
      const subscriptions = await Subscription.find({
        showId: listOfIds[i],
      });
      subsResults.push({ id: listOfIds[i], count: subscriptions.length });
    }
    return res.status(200).json(subsResults);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

// @route   POST api/subscription/subscribe/:showId
// @desc    Subscribe to a show
// @access  Private
router.post("/subscribe/:showId", async (req, res, next) => {
  try {
    // fetching this first will ensure that the provided showId is legit
    let uri = encodeURI(
      `https://api.spotify.com/v1/shows/${req.params.showId}/episodes?market=AU`
    );
    let headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    let spotifyResponse = await axios.get(uri, { headers });

    const showEpisodesId = spotifyResponse.data.items.map(
      (episode) => episode.id
    );

    // Make another request to fetch the podcast name
    uri = encodeURI(
      `https://api.spotify.com/v1/shows/${req.params.showId}?market=AU`
    );
    spotifyResponse = await axios.get(uri, { headers });

    const title = spotifyResponse.data.name;

    let subscribe = await Subscription.findOneAndUpdate(
      {
        user: req.user._id,
        showId: req.params.showId,
      },
      { showId: req.params.showId, showTitle: title },
      {
        new: true,
        upsert: true,
      }
    );

    subscribe.showEpisodesIds = showEpisodesId;
    await subscribe.save();

    return res.status(200).json(subscribe);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

// @route   GET api/subscription/trending
// @desc    Get User's subscriptions
// @access  Private
router.get("/trending", async (req, res) => {
  try {
    const subscriptions = await Subscription.aggregate([
      {
        $group: {
          _id: "$showId",
          data: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

// @route   PUT api/subscription/:subscriptionid
// @desc    Updates a user's subscriptions with the latest episodes
// @access  Private
// @accepts Array containing list of new episode Ids which the user has acknowledged.
router.put("/:subscriptionId", async (req, res, next) => {
  try {
    // Array of acknowledged episode Ids
    const newEpisodeIds = req.body.acknowledgedEpisodeIds;
    const subscription = await Subscription.findById(
      req.params.subscriptionId,
      async function (err, subscription) {
        for (const episodeId of newEpisodeIds) {
          subscription.showEpisodesIds.push(episodeId);
        }
        await subscription.save(function (err) {
          if (err) throw Exception();
          return res.status(200).json("Success");
        });
      }
    );
  } catch (err) {
    console.log(err);
    return next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});
module.exports = router;
