// utility methods for getting User History and Subscription MongoDB objects.
const HistoryModel = require("../../models/HistoryModel");
const SubscriptionModel = require("../../models/SubscriptionModel");
const { NotFound } = require("../errors");


const UserRecord = function(){};

UserRecord.prototype.getUserHistory = function(req) {
    var doc = HistoryModel.find({user_id: req.user.id}).select("podcast_id").select("-_id");
    return doc;
}

UserRecord.prototype.getUserSubscription = function(req) {
    var doc = SubscriptionModel.find({user: req.user.id}).select('showId').select('-_id');
    return doc;
}

module.exports = UserRecord;
