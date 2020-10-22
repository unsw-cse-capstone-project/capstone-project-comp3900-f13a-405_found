const express = require(express);
const axios = require("axios");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const Playlist = require("../../models/PlaylistModel");

// Get playlist on the homepage
router.get("/", async(req, res) => {
    try {
        const playlist = await Playlist.find({ user: req.user.id }).select(
            "-__v"
        );
        return res.status(200).json(playlist);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
});

// Add episode to playlist
router.post("/playlistAdd/:episodeId", async (req, res, next) => {
    try {    
        let playlist = await Playlist.findOneAndUpdate(
            { 
                user: req.user.id, 
            },
            { 
                episodeId: req.params.episodeId
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
            showId: req.params.showId,
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

