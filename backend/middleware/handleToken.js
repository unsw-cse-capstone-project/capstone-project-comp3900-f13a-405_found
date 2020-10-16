const passport = require("passport");

const checkUserToken = (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.clearCookie("token", {httpOnly: true});
            return res.status(401).send("Unauthorised user");
        }
        return next();
    })(req, res, next);
};

module.exports = checkUserToken;