const { QueryBuilderRounded } = require("@material-ui/icons");
const express = require("express");
const HistoryModel = require("../../models/HistoryModel");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();


// @route  GET api/user-history
// @desc   Gets podcast history for user currently logged in.
// @access Private 

router.get (
    '/', (req, res, next) => {
        const query = HistoryModel.find({user_id: `${req.user.id}`}).select("-__v");
        
        query.exec().then(user_history => {
          //  const json_user_history = JSON.stringify(user_history);
            return res.status(200).json(user_history);
        })
        .catch(err => {
            console.error(err.message);
            next(new BadRequest([{msg: "User History: Bad Request."}]));
        });
    }
)

// @route GET api/user-history/:p_id
// @desc Gets bool value of if podcast 'p_id' has been viewed by a user.
// @access Private 
router.get (
    '/:p_id', (req, res, next) => {
        const query = HistoryModel.findOne({user_id: `${req.user.id}`, podcast_id: `${req.params.p_id}`}).lean();
        query.exec().then(hist_entry => {
            if (hist_entry != null)
                return res.status(200).json({ Viewed: true});
            else
                return res.status(200).json({ Viewed: false});
            
        })
        .catch(err => {
            console.error(err.message);
            next (new BadRequest([{msg: "User History: Bad Request."}]));
        });       
    }

)


// @route  POST api/user-history/:p_id
// @desc   creates/updates user history entry for a user when given podcast id 'p_id' 
// @access Private 

router.post (
    '/:p_id', (req, res, next) => {
        const filter = {user_id: `${req.user.id}`, podcast_id: `${req.params.p_id}`};
        const update = {last_played: `${Date.now()}`};

        const query = HistoryModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        }).lean()
        .select("-__v");

        query.exec()
        .then(upd_podcast => {
           // const json_upd_podcast = JSON.stringify(upd_podcast);
            return res.status(200).json(upd_podcast);
        })
        .catch(err => {
            console.error(err.message);
            next(new BadRequest([{msg: "User History: Bad Request."}]));
        });
    }
)

module.exports = router;


