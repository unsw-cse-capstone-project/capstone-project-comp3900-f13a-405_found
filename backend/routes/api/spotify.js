const express = require("express");
const axios = require("axios");
const { NotFound } = require("../../utils/errors");
const router = express.Router();

// @route   GET api/spotify/search/:queryToBeSearched
// @desc    Search for episodes & shows
// @access  Public
router.get(
  "/search/:queryToBeSearched",

  async (req, res, next) => {
    try {
      // https://developer.spotify.com/documentation/web-api/reference/search/search/
      // available types : album , artist, playlist, track, show and episode.
      const uri = encodeURI(
        `https://api.spotify.com/v1/search?q=${req.params.queryToBeSearched}&type=episode,show&market=AU&include_external=audio`
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

module.exports = router;
