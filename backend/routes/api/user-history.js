const { ContactlessOutlined } = require("@material-ui/icons");
const { query } = require("express");
const express = require("express");
const HistoryModel = require("../../models/HistoryModel");
const { NotFound } = require("../../utils/errors");
const router = express.Router();


// @route  GET api/user-history
// @desc   returns a user's history for a given username.
// @access Public

router.get (
    '/', (req, res, next) => {
        const query = HistoryModel.find({user_id: `${req.user.id}`});
        query.exec()
        .then(user_history => {
            const json_user_history = JSON.stringify(user_history);
            return res.status(200).json(json_user_history);
        })
        .catch(err => {
            console.error(err.message);
            next(new notfound([{msg: "unable to find user history for user:" + req.user.id}]));
        });
    }
)

// @route  POST api/user-history/:podcast_id
// @desc   creates/updates an entry for a user's history - :id spotify API id reference. 
// @access Public

router.post (
    '/:p_id', (req, res, next) => {
        const filter = {user_id: `${req.user.id}`, podcast_id: `${req.params.p_id}`};
        const update = {last_played: `${Date.now()}`};

        const query = HistoryModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).lean();

        query.exec()
        .then(upd_podcast => {
            const json_upd_podcast = JSON.stringify(upd_podcast);
            return res.status(200).json(json_upd_podcast);
        })
        .catch(err => {
            console.error(err.message);
            next(new NotFound([{msg: "Could not update history for podcast: " + req.params.p_id + "for user: " + req.user.u_id}]));
        });
    }
)

module.exports = router;


