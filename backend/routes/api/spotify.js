const express = require("express");
const axios = require("axios");
const { NotFound } = require("../../utils/errors");
const router = express.Router();
const Subscriptions = require("../../models/SubscriptionModel");

// @route   GET api/spotify/search/:queryToBeSearched
// @desc    Search for shows
// @access  Private
router.get(
  "/search/:queryToBeSearched",

  async (req, res, next) => {
    try {
      // https://developer.spotify.com/documentation/web-api/reference/search/search/
      // available types : album , artist, playlist, track, show and episode.
      const uri = encodeURI(
        `https://api.spotify.com/v1/search?q=${req.params.queryToBeSearched}&type=show&market=AU&include_external=audio`
      );
      const headers = {
        "user-agent": "node.js",
        Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
      };
      const spotifyResponse = await axios.get(uri, { headers });

      const subscriptions = await Subscriptions.aggregate([
        {
          $group: {
            _id: "$showId",
            data: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
      ]);

      //  for O(1) performance !
      const showIdAndCount = {};

      subscriptions.map((subs) => {
        showIdAndCount[`${subs.data[0].showId}`] = subs.count;
        return subs;
      });

      const modifiedResponseItems = spotifyResponse.data.shows.items.map(
        (show) => ({
          ...show,
          subsCount: show.id in showIdAndCount ? showIdAndCount[show.id] : 0,
        })
      );

      spotifyResponse.data.shows.items = modifiedResponseItems;

      return res.status(200).json(spotifyResponse.data);
    } catch (err) {
      console.error(err.message);
      next(new NotFound([{ msg: "No episodes / shows found" }]));
    }
  }
);

// @route   GET api/spotify/shows/:id
// @desc    Get detailed information about a show by id
// @access  Private
router.get(
  "/shows/:id",

  async (req, res, next) => {
    try {
      // https://developer.spotify.com/documentation/web-api/reference/shows/
      const uri = encodeURI(
        `https://api.spotify.com/v1/shows/${req.params.id}?market=AU`
      );
      const headers = {
        "user-agent": "node.js",
        Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
      };
      const spotifyResponse = await axios.get(uri, { headers });

      return res.status(200).json(spotifyResponse.data);
    } catch (err) {
      console.error(err.message);
      next(new NotFound([{ msg: "No shows found with id: " + req.params.id }]));
    }
  }
);

// @route   GET api/spotify/episodes/:id
// @desc    Get detailed information about an episode by id
// @access  Private
router.get(
  "/episodes/:id",

  async (req, res, next) => {
    try {
      // https://developer.spotify.com/documentation/web-api/reference/episodes/
      const uri = encodeURI(
        `https://api.spotify.com/v1/episodes/${req.params.id}?market=AU`
      );
      const headers = {
        "user-agent": "node.js",
        Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
      };
      const spotifyResponse = await axios.get(uri, { headers });

      return res.status(200).json(spotifyResponse.data);
    } catch (err) {
      console.error(err.message);
      next(
        new NotFound([{ msg: "No episode found with id: " + req.params.id }])
      );
    }
  }
);

// @route   GET api/spotify/bulkshows/:ids
// @desc    Get spotify shows details by a list of ids
// @access  Private
router.get("/bulkshows/:ids", async (req, res, next) => {
  try {
    // sanity check to prevent ''
    const listOfIds = req.params.ids
      .split(",")
      .filter((id) => id.length > 0)
      .join(",");

    // https://developer.spotify.com/console/get-several-shows/?ids=5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ

    const uri = encodeURI(
      `https://api.spotify.com/v1/shows?ids=${listOfIds}&market=AU`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    };
    const spotifyResponse = await axios.get(uri, { headers });

    return res.status(200).json(spotifyResponse.data);
  } catch (err) {
    console.error(err.message);
    next(new NotFound([{ msg: "No shows found with ids: " + req.params.ids }]));
  }
});

// @route   GET api/spotify/shows/:id/episodes
// @desc    Get a list of a Spotify show's episodes by show id
// @access  Private
router.get("/shows/:id/episodes", async (req, res, next) => {
  try {
    // https://developer.spotify.com/documentation/web-api/reference/shows/
    let episodeList = [];
    let counter = 0;
    let stop = false;
    const uri = encodeURI(
      `https://api.spotify.com/v1/shows/${req.params.id}/episodes?market=AU`
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
    return res.status(200).json(episodeList);
  } catch (err) {
    console.error(err.message);
    next(new NotFound([{ msg: "No episodes or shows with that id found" }]));
  }
});

module.exports = router;
