const express = require("express");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const { getUserNotification } = require("../../utils/notificationsUtils");

// @route   GET api/notifications/
// @desc    Generate all user notifications if any should exist
// @access  Private
router.get("/", async (req, res, next) => {
  // Fetch the most recent episode Ids from spotify
  try {
    const notifications = await getUserNotification(req.user.id);
    return res.status(200).json(notifications);
  } catch (err) {
    console.error(err.message);
    next(new BadRequest([{ msg: "Bad Request!!" }]));
  }
});

module.exports = router;
