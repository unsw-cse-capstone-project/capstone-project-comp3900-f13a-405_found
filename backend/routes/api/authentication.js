const express = require("express");
const router = express.Router();

// @route   GET api/authentication
// @desc    Test route only :p
// @access  Public
router.get("/", (req, res) => {
  res.status(200).send("Authentication route!");
});

module.exports = router;
