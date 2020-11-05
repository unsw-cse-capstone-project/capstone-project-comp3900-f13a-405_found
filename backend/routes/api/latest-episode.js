const express = require("express");
const HistoryModel = require("../../models/HistoryModel");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();

// @route  GET api/latest-episode
// @desc   Gets podcast history for user currently logged in.
// @access Private

router.get("/", (req, res, next) => {
  console.log("user-history: " + req.user._id);
  const query = HistoryModel.findOne({ 
    user_id: `${req.user._id}` 
  }).sort({last_played: -1});
  query
    .exec()
    .then((user_history) => {
      //  const json_user_history = JSON.stringify(user_history);
      return res.status(200).json({ 
        seconds: user_history.seconds_played, 
        episode_id: user_history.podcast_id,
        url: user_history.podcast_url,
        image: user_history.podcast_image 
      });
    })
    .catch((err) => {
      console.error(err.message);
      next(new BadRequest([{ msg: "User History: Bad Request." }]));
    });
});

// @route GET api/user-history/:p_id
// @desc Gets bool value of if podcast 'p_id' has been viewed by a user.
// @access Private
router.get("/:p_id", (req, res, next) => {
  const query = HistoryModel.findOne({
    user_id: `${req.user._id}`,
    podcast_id: `${req.params.p_id}`,
  }).lean();
  query
    .exec()
    .then((hist_entry) => {                                        
      if (hist_entry != null) return res.status(200).json({ 
        Viewed: true, 
        seconds: hist_entry.seconds_played//,
        //  url: hist_entry.podcast_url,
        //  image: hist_entry.podcast_image
      });
      else return res.status(200).json({ 
        Viewed: false, 
        seconds: hist_entry.seconds_played//,
        //  url: hist_entry.podcat_url,
        // image: hist_entry.podcaset_image
      });
    })
    .catch((err) => {
      console.error(err.message);
      next(new BadRequest([{ msg: "User History: Bad Request." }]));
    });
});

// @route  POST api/user-history/:p_id/:seconds_played
// @desc   creates/updates user history (date + seconds played) entry for a user when given podcast id 'p_id'
// @access Private
router.post("/:p_id/:played", (req, res, next) => {
  const filter = {
    user_id: `${req.user._id}`,
    podcast_id: `${req.params.p_id}`,
  };
  console.log("INSIDE POST - URL: " + req.body);
  const update = { 
    last_played: `${Date.now()}`,
    seconds_played: `${req.params.played}`,
    podcast_id: `${req.params.p_id}`,  // double check this
    podcast_url: req.body.p_url,
    podcast_image: req.body.p_image,
  };

  const query = HistoryModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  })
    .lean()
    .select("-__v");

  query
    .exec()
    .then((upd_podcast) => {
      return res.status(200).json(upd_podcast);
    })
    .catch((err) => {
      console.error(err.message);
      next(new BadRequest([{ msg: "User History: Bad Request." }]));
    });
});



module.exports = router;