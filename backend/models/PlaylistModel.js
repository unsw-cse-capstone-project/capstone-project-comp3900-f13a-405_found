const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user", 
    }, 
    playlistName: String,
    playlistEpisodes: [{
        audio_preview_url: String,
        description: String,
        id: String,
        name: String,
        release_date: String,
    }],
});

const PlaylistModel = mongoose.model("playlist", PlaylistSchema);
module.exports = PlaylistModel;


