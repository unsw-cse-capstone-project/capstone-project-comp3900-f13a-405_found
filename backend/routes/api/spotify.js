const express = require("express");
const axios = require("axios");
const { NotFound } = require("../../utils/errors");
const router = express.Router();

// @route   GET api/spotify/search/:queryToBeSearched
// @desc    Search for shows
// @access  Public
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

      return res.status(200).json(spotifyResponse.data);
    } catch (err) {
      console.error(err.message);
      next(new NotFound([{ msg: "No episodes / shows found" }]));
    }
  }
);

// @route   GET api/spotify/shows/:id
// @desc    Get detailed information about a show by id
// @access  Public
router.get(
  "/shows/:id",

  async(req, res, next) => {
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
      next(new NotFound([{msg: "No shows found with id: " + req.params.id}]));
    }
  }
);

// @route   GET api/spotify/episodes/:id
// @desc    Get detailed information about an episode by id
// @access  Public
router.get(
  "/episodes/:id",

  async(req, res, next) => {
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
      next(new NotFound([{msg: "No episode found with id: " + req.params.id}]));
    }
  }
);

module.exports = router;
