const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  showId: {
    type: String,
  },
  showTitle: {
    type: String,
  },
  showEpisodesIds: [String],
});
const SubscriptionModel = mongoose.model("subscription", SubscriptionSchema);
module.exports = SubscriptionModel;
