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



module.exports = router;