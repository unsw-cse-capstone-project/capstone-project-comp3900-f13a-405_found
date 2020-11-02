// Not Stolen keys:
// listen API
// const key = "5df881c89d644904bc39af8b922c9441"; //old key
// const key = "d370e5f11d0a4b14956d88517e75fd8a"; // Nathan's key

//const key = "49ec7884ad4a47f2be99eed90a061cf4"; // Spare key 1
//const endpoint = "https://listen-api.listennotes.com/api/v2/";

const express = require("express");

const UserRecord = require("../../utils/recommenderUtils/userRecordUtil");
const EpisodeMatch = require("../../utils/recommenderUtils/episodeMatchUtil");
const SearchParams = require("../../utils/recommenderUtils/searchParamsUtil");
const ListenNotes = require("../../utils/recommenderUtils/listenNotesUtil");
const SpotifyUtil = require("../../utils/recommenderUtils/spotifyUtil");
const { BadRequest } = require("../../utils/errors");


const router = express.Router();

// @route  GET api/recommendations
// @desc   For the logged in user, returns a playlist containing user recommendations (spotify id, name, artwork). 
// @access Private

router.get('/', async(req, res, next) => {
    try {
        const userRecord = new UserRecord();
        const subscriptions = await userRecord.getUserSubscription(req); // array of objects containing only showIds (JSON string formatted).
        const history = await userRecord.getUserHistory(req); // array of objects containing only episodeIds (JSON string formatted).

        const episodeMatch = new EpisodeMatch();
        const spotifyShowIds = await episodeMatch.getShowIds(history, subscriptions);

        const searchParams = new SearchParams();
        const showsList = await searchParams.getSearchParams(spotifyShowIds); // returns an array of objects [{title, publisher}, ..., {t_n, p_n}]

        const listenNotes = new ListenNotes();
        const listenNotesRecs = await listenNotes.getListenNotesRecs(showsList);

        const spotifyUtil =  new SpotifyUtil();
        const matchedSpotifyRecs = await spotifyUtil.getMatchedSpotifyRecs(listenNotesRecs);
        console.log(matchedSpotifyRecs.length);
        return res.status(200).json(matchedSpotifyRecs);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad Request."}]));
    }
});

module.exports = router;