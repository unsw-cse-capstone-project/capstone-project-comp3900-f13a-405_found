const express = require("express");

const UserRecord = require("../../utils/recommenderUtils/userRecordUtil");
const EpisodeMatch = require("../../utils/recommenderUtils/episodeMatchUtil");
const SearchParams = require("../../utils/recommenderUtils/searchParamsUtil");
const ListenNotes = require("../../utils/recommenderUtils/listenNotesUtil");
const SpotifyUtil = require("../../utils/recommenderUtils/spotifyUtil");
const { BadRequest } = require("../../utils/errors");

const router = express.Router();

// @route  GET api/recommendations
// @desc Returns a list of recommendations for the currently logged in user.
// @access Private
router.get("/", async (req, res, next) => {
  try {
    var recommendations = {};
    const userRecord = new UserRecord();
    const subscriptions = await userRecord.getUserSubscription(req);
    const history = await userRecord.getUserHistory(req);
    if (subscriptions.length != 0 || history.length != 0) {
      const episodeMatch = new EpisodeMatch();
      const spotifyShowIds = await episodeMatch.getShowIds(
        history,
        subscriptions
      );

      const searchParams = new SearchParams();
      const showsList = await searchParams.getSearchParams(spotifyShowIds);
      const listenNotes = new ListenNotes();
      const listenNotesRecs = await listenNotes.getListenNotesRecs(showsList);

      const spotifyUtil = new SpotifyUtil();
      const matchedSpotifyRecs = await spotifyUtil.getMatchedSpotifyRecs(
        listenNotesRecs
      );
      recommendations.nrecs = matchedSpotifyRecs.length;
      recommendations.recs = matchedSpotifyRecs;
    } else {
      const spotifyUtil = new SpotifyUtil();
      recommendations.nrecs = 0;
      recommendations.recs = await spotifyUtil.getRecommendationsForNewUsers();
    }

    return res.status(200).json(recommendations);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Recommender: Bad Request." }]));
  }
});

module.exports = router;
