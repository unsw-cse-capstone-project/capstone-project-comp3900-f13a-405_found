const express = require("express");
const axios = require("axios");
const History = require("../../models/HistoryModel");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();

// @route  GET api/user-history
// @desc   Gets podcast history for user currently logged in.
// @access Private
router.get("/", async (req, res, next) => {
  try {
    const usersHistory = await History.find({
      user: `${req.user.id}`,
    }).select("-__v");

    return res.status(200).json(usersHistory);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "/user-history/ Bad Request" }]));
  }
});

// @route GET api/user-history/:p_id
// @desc Gets bool value of if podcast 'p_id' has been viewed by a user.
// @access Private
router.get("/:episodeId", async (req, res, next) => {
  try {
    const historyEntry = await History.exists({
      user: `${req.user.id}`,
      episodeId: `${req.params.episodeId}`,
    });

    return res.status(200).json(historyEntry);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "/user-history/:${episodeId} Bad Request." }]));
  }
});

// @route  POST api/user-history/:episodeId
// @desc   creates/updates user history entry for a user when given podcast id 'p_id'
// @access Private
router.post("/:episodeId", async (req, res, next) => {
  try {
    console.log(req.params.episodeId);
    const uri = encodeURI(
      `https://api.spotify.com/v1/episodes/${req.params.episodeId}?market=AU`
    );

    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };

    const spotifyResponse = await axios(uri, { headers });

    const filter = {
      user: `${req.user.id}`,
      episodeId: `${req.params.episodeId}`,
    };

    const update = {
      lastPlayed: `${Date.now()}`,
      episodeName: `${spotifyResponse.data.name}`,
      showName: `${spotifyResponse.data.show.name}`,
    };

    const updatedHistoryEntry = await History.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    }).select("-__v");

    return res.status(200).json(updatedHistoryEntry);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "User History: Bad Request." }]));
  }
});

module.exports = router;
