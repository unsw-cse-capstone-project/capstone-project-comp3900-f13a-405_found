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
    last_played: {
        type: Date,
        default: Date.now,
    },
});

const HistoryModel = mongoose.model("user_history", HistorySchema);
module.exports = HistoryModel;