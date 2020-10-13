const mongoose = require("mongoose");
const { collection } = require("./UserModel");

const HistorySchema = new mongoose.Schema({
    u_name: {
        type: String,
        required: true,
    },
    p_name: {
        type: String,
        required: true,
    },
    last_played: {
        type: Date,
        default: Date.now,
    },
});

const HistoryModel = mongoose.model("user_history", HistorySchema, "user_histories");
module.exports = HistoryModel;