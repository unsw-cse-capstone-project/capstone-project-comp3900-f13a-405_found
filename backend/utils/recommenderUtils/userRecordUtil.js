// utility methods for getting User History and Subscription MongoDB objects.
const HistoryModel = require("../../models/HistoryModel");
const SubscriptionModel = require("../../models/SubscriptionModel");
const { NotFound } = require("../errors");

// return HistoryModel object. 
const getUserHistory = async (req, next) => {
    try {
        const history = await HistoryModel.find({user: req.user.id}).select("-__v");
        return json(history);
    } catch {
        console.error(err.message);
        next (new NotFound([{msg: "Recommender: Could not find User History"}]));
    }   
};

// return SubscriptionMOdel object.
const getUserSubscription = async (req, next) => {
    try {
        const subscriptions = await SubscriptionModel.find({user: req.user.id}).select("-__v");
        return json(subscriptions);
    } catch {
        console.error(err.message);
        next (new NotFound ([{msg: "Recommender: Could not find User Subscriptions"}]));
    }
}

module.exports = getUserHistory;
module.exports = getUserSubscription; 