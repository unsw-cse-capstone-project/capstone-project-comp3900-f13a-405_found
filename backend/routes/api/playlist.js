const express = require(express);
const axios = require("axios");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const Playlist = require("../../models/PlaylistModel");
const Subscription = require("../../models/SubscriptionModel");

// Get user's playlist
router.get("/", async(req, res) => {
    try {
        const playlist = await Playlist.find({ user: req.user.id }).select(  // Change this later
            "-__v"
        );
        return res.status(200).json(playlist);   
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
});

// Add episode to playlist
// @route POST api/subscription/subscribe/:showId 
router.post("/playlistAdd/:showId", async (req, res, next) => {
    try {   
        const uri = encodeURI(
            `https://api.spotify.com/v1/shows/${req.params.showId}/episodes?market=AU`
        );
        const headers = {
            "user-agent": "node.js",
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
        };
        const spotifyResponse = await axios.get(uri, { headers });

        const show

        let playlist = await Playlist.findOneAndUpdate(
            { 
                user: req.user.id,
                showId: req.params.showId,
            },
            { 
                showId: req.params.showId
            },
            { 
                new: true,
                upsert: true,
            },
        );

        await playlist.save();
        return res.status(200).json(playlist);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
});


// Delete episode from playlist
router.post("/playlistDelete/:episodeId", async(req, res) => {
    try {
        const playlist = await Playlist.deleteOne({
            user: req.user.id,
            showId: req.params.episodeId,
        });
        if (playlist.deletedCount <= 0) {
            return res.status(400).json({ Success: false });
        }
        return res.status(200).json({ Success: true });

    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
}); 

