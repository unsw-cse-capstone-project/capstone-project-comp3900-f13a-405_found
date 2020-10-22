const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user", 
   }, 
   episodeId: String,
});

const PlaylistModel = mongoose.model("playlist", SubscriptionSchema);
module.exports = PlaylistModel;


