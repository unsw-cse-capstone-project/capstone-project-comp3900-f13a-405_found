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
    const subscriptions = await Subscription.find({ user: req.user.id }).select(
      "-__v"
    );

    return res.status(200).json(subscriptions);
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
    const uri = encodeURI(
      `https://api.spotify.com/v1/shows/${req.params.showId}/episodes?market=AU`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    const spotifyResponse = await axios.get(uri, { headers });

    const showEpisodesId = spotifyResponse.data.items.map(
      (episode) => episode.id
    );

    let subscribe = await Subscription.findOneAndUpdate(
      {
        user: req.user.id,
        showId: req.params.showId,
      },
      { showId: req.params.showId },
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

module.exports = router;
