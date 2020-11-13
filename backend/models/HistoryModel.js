const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  episodeId: {
    type: String,
    required: true,
  },
  episodeName: {
    type: String,
    required: true,
  },
  showName: {
    type: String,
    required: true,
  },
  lastPlayed: {
    type: Date,
    default: Date.now,
  },
});

const HistoryModel = mongoose.model("user_history", HistorySchema);
module.exports = HistoryModel;
