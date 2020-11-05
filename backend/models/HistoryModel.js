const mongoose = require("mongoose");
const { collection } = require("./UserModel");

const HistorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    podcast_id: {
        type: String,
        required: true,
    },
    seconds_played: { 
        type: Number,
        default: 0, 
    },
    last_played: {
        type: Date,
        default: Date.now,
    },
    podcast_url: { //URLs in the DB isn't saving properly. The string is changed upon saving it seems like. The URLs I see at handlePause() is different to what is in the database. 
        type: String, 
        required: true, 
    },
    podcast_image: {
        type: String, 
        required: true,
    },
});

const HistoryModel = mongoose.model("user_history", HistorySchema);
module.exports = HistoryModel;