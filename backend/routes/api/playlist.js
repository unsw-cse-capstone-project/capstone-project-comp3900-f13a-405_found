const express = require("express");
const axios = require("axios");
const { BadRequest } = require("../../utils/errors");
const router = express.Router();
const Playlist = require("../../models/PlaylistModel");

// @route   GET api/playlist/:id
// @desc    Get a user's playlist by id
// @access  Private
router.get("/:id", async(req, res) => {
    try {
        const playlist = await Playlist.find({ user: req.user.id, _id: req.params.id }).select(
            "-__v"
        );
        return res.status(200).json(playlist);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
});

// @route   GET api/playlist/
// @desc    Get all of a user's playlists
// @access  Private
router.get("/", async(req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.id}).select(
            "-__v"
        );
        return res.status(200).json(playlists);
    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Bad Request!"}]));
    }
});

// @route   POST api/playlist/:name
// @desc    Get a user's playlist by id
// @access  Private
router.post("/:name", async(req, res) => {
    try {
        const playlist = new Playlist({
            user: req.user.id,
            playlistName: req.params.name,
            playlistEpisodes: []
        });
        playlist.save(err => {
            if (err) {
                console.log(err);
                next(new BadRequest([{ msg: "Bad Request!!" }]));
            }
            return res.status(200).json(playlist);
        });
    } catch(err) {
        console.log(err);
        next(new BadRequest([{ msg: "Bad Request!!" }]));
    }
});

// @route   POST api/playlist/add/:playlistId/:episodeId
// @desc    Add an episode to a playlist by Id
// @access  Private
router.post("/:playlistId/:episodeId", async(req,res,next) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlistId, 
            async function(err, playlist) {
                try { 
                     // Check if the episode is already in the playlist
                    if (playlist.playlistEpisodes.includes(req.params.episodeId) ) {
                        return res.status(400).json("Error: Episode already exists in this playlist");
                    }
                    // Add to the episode to the playlist
                    playlist.playlistEpisodes.push(req.params.episodeId);
                    await playlist.save(function(err) {
                        if (err) {
                            console.log(err)
                            throw "Error: Couldn't save episode to playlist";
                        }
                        return res.status(200).json("Success");
                    });
                } catch(err) {
                    console.log(err)
                    return res.status(400).json(err);
                }
        });
    } catch(err) {
        console.log(err);
        next(new BadRequest([{ msg: "Bad Request!!" }]));
    }
});

// @route   DELETE api/playlist/add/:playlistId/:episodeId
// @desc    Remove an episode from a playlist by Id
// @access  Private
router.delete("/:playlistId/:episodeId", async(req,res,next) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlistId, 
            async function(err, playlist) {
                try { 
                     // Check if the episode exists in the playlist
                    if (!playlist.playlistEpisodes.includes(req.params.episodeId) ) {
                        return res.status(404).json("Error: Episode does not exist in this playlist");
                    }
                    // Remove episode from the playlist
                    playlist.playlistEpisodes = playlist.playlistEpisodes.filter(episodeId => episodeId != req.params.episodeId);
                    await playlist.save(function(err) {
                        if (err) {
                            console.log(err)
                            throw "Error: Couldn't update playlist";
                        }
                        return res.status(200).json("Success");
                    });
                } catch(err) {
                    console.log(err)
                    return res.status(400).json(err);
                }
        });
    } catch(err) {
        console.log(err);
        next(new BadRequest([{ msg: "Bad Request!!" }]));
    }
});

module.exports = router;