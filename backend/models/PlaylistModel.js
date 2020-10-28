const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user", 
   }, 
   showId: String,
});

const PlaylistModel = mongoose.model("playlist", PlaylistSchema);
module.exports = PlaylistModel;


