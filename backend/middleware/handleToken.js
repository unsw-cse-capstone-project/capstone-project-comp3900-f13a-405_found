const passport = require("passport");
const UserModel = require("../models/UserModel");

const checkUserToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.clearCookie("token", { httpOnly: true });
      return res.status(401).send("Unauthorised user");
    }
    let userModel = await UserModel.findOne({ _id: user.id }).select(
      "-password"
    );
    req.user = userModel;
    return next();
  })(req, res, next);
};

module.exports = checkUserToken;
