const express = require("express");
const router = express.Router();

// @route   GET api/secure/
// @desc    Check if a user's existing cookie is still valid, if they can visit this route, then it's valid
// @access  Private
router.get("/", (req, res, next) => {
  return res.status(200).json({ Success: true, user: req.user });
});

module.exports = router;
