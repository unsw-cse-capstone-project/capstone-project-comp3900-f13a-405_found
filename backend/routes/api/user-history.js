const { ContactlessOutlined } = require("@material-ui/icons");
const { query } = require("express");
const express = require("express");
const HistoryModel = require("../../models/HistoryModel");
const { NotFound } = require("../../utils/errors");
const router = express.Router();


// @route  GET api/user-history/:u_name
// @desc   returns a user's history for a given username.
// @access Public


router.get (
    '/:u_name', (req, res, next) => {
        HistoryModel.find({u_name: `${req.params.u_name}`}).
        exec((err, user_history) => {
            if (err) {
                console.error(err.message);
                next(new NotFound([{msg:"No user-history for user:" + req.params.u_name}]));
            }
            user_history.forEach(entry => {
                console.log(JSON.stringify(entry))
            });
            return res.send(JSON.stringify(user_history));
        });
    }

);

// @route  POST api/user-history/:u_name
// @desc   creates/updates a user-history entry in MongoDB for a given podcast and person - returns new/updated entry. 
// @access Public

router.post (
    '/:u_name', (req, res, next) => {
        var u_name = req.params.u_name;
        var p_name = req.body.p_name;
        
        if (!u_name || !p_name) {
            next (new NotFound([{msg: "Missing values for username or podcast"}]));
        }

        const filter = {u_name: `${u_name}`, p_name: `${p_name}`};
        const update = {last_played: `${Date.now()}`};
        HistoryModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).
        lean().
        exec((err, upd_podcast) => {
            if (err) {
                console.error(err.message);
                next (new NotFound([{msg: `Unable to record to user history`}]));
            }
            return res.send(JSON.stringify(upd_podcast)); 
        });
    }

);


module.exports = router;


