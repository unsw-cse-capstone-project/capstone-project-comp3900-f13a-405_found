// Not Stolen keys:
// listen API
// const key = "5df881c89d644904bc39af8b922c9441"; //old key
// const key = "d370e5f11d0a4b14956d88517e75fd8a"; // Nathan's key

//const key = "49ec7884ad4a47f2be99eed90a061cf4"; // Spare key 1
//const endpoint = "https://listen-api.listennotes.com/api/v2/";

const express = require("express");
const axios = require("axios");
const userRecordUtil = require("../../utils/recommenderUtils/userRecordUtil");
const searchParamsUtil = require("../../utils/recommenderUtils/searchParamsUtil");
const listNotesUtil = require("../../utils/recommenderUtils/listenNotesUtil");
const router = express.Router();

// @route  GET api/recommendations
// @desc   For the logged in user, returns a playlist containing user recommendations (spotify id, name, artwork). 
// @access Private

router.get('/', async(req, res, next) => {
    try {
        const user_history = userRecordUtil.getUserHistory;
        const user_subscriptions = userRecordUtil.getUserSubscription;
        const shows_list = searchParamsUtil.getSearchParams(user_history, user_subscriptions); // array of objects of form [{title: "title", publisher: "publisher"}, ...]
        const listenNotesRecs = listenNotesUtil.getListNotesRecs(shows_list); // array of objects of form [{title: "title", publisher: "publisher"}, ...];
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad Request."}]));
    }
});

module.exports = router;