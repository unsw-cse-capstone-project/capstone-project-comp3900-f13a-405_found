const express = require('express');
const router = express.Router();

// @route get api/dashboard
// @desc Endpoints for dashboard view.
// @access Public


router.get("/", (req, res) => {
    res.status(200).send("Dashboard route setup");
});

module.exports = router;