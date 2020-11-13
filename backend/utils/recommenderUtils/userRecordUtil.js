const HistoryModel = require("../../models/HistoryModel");
const SubscriptionModel = require("../../models/SubscriptionModel");

const UserRecord = function () {};

// @desc: gets a list of episodeIds of episodes viewed from a user's history.
// @inputs: req (req.user.id) - currently logged in user
// @ouputs: doc - list of objects {showId}.
UserRecord.prototype.getUserHistory = async function (req) {
  try {
    var doc = await HistoryModel.find({ user: req.user.id })
      .select("episodeId")
      .select("-_id");
    return doc;
  } catch (err) {
    console.error(err.message);
  }
};

// @desc:    Gets a list of showIds from the currently logged in user
// @inputs:  req (req.user.id) - currently logged in user
// @outputs: doc - list of objects {showId}.
UserRecord.prototype.getUserSubscription = async function (req) {
  try {
    var doc = SubscriptionModel.find({ user: req.user.id })
      .select("showId")
      .select("-_id");
    return doc;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = UserRecord;
