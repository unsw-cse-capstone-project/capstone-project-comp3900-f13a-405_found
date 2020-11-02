// utility methods for getting User History and Subscription MongoDB objects.
const HistoryModel = require("../../models/HistoryModel");
const SubscriptionModel = require("../../models/SubscriptionModel");
const { NotFound } = require("../errors");


const UserRecord = function(){};

UserRecord.prototype.getUserHistory = async function(req) {
    try {
        var doc = await HistoryModel.find({user_id: req.user.id}).select("podcast_id").select("-_id");
        return doc;
    } catch(err) {
        console.error(err.message);
    }
}

UserRecord.prototype.getUserSubscription = async function(req) {
    try {
        var doc = SubscriptionModel.find({user: req.user.id}).select('showId').select('-_id');
        return doc;
    } catch(err) {
        console.error(err.message);
    }
}

module.exports = UserRecord;
