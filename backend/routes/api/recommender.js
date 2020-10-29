// Not Stolen keys:
// listen API
// const key = "5df881c89d644904bc39af8b922c9441"; //old key
// const key = "d370e5f11d0a4b14956d88517e75fd8a"; // Nathan's key

//const key = "49ec7884ad4a47f2be99eed90a061cf4"; // Spare key 1
//const endpoint = "https://listen-api.listennotes.com/api/v2/";

const express = require("express");
const {getUserHistory, getUserSubscription} = require("../../utils/recommenderUtils/userRecordUtil")(req);
const getSearchParams = require("../../utils/recommenderUtils/searchParamsUtil")(history, subscriptions);
const getListenNotesRecs = require("../../utils/recommenderUtils/listenNotesUtil")(shows_list);
const getMatchedSpotifyRecs = require("../../utils/recommenderUtils/spotifyUtil")(listenNotesRecs);
const router = express.Router();

// @route  GET api/recommendations
// @desc   For the logged in user, returns a playlist containing user recommendations (spotify id, name, artwork). 
// @access Private

router.get('/', async(req, res, next) => {
    try {
        const history = getUserHistory(req); // JSON string of user history
        const subscriptions = getUserSubscription(req); // JSON string of user subscriptions
        const shows_list = getSearchParams(history, subscriptions); // array of objects of form [{title: "title", publisher: "publisher"}, ...]
        const listenNotesRecs = getListenNotesRecs(shows_list); // array of objects of form [{title: "title", publisher: "publisher"}, ...];
        const matchedSpotifyRecs = getMatchedSpotifyRecs(listenNotesRecs); // array of spotify shows for frontend use.
        return res.status(200).json(matchedSpotifyRecs);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad Request."}]));
    }
});

module.exports = router;