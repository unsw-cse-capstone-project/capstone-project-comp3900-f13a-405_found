// passport js auth middleware
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");
const gravatar = require("gravatar");
const { compareSync } = require("bcryptjs");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let user = await UserModel.findOne({ email: email });

        if (user) {
          return done(null, false, { message: "User Exists" });
        }
        user = new UserModel({
          name: req.body.name,
          email,
          avatar: gravatar.url(email, {
            s: "300",
            r: "pg",
            d: "mm",
          }),
          password: password,
        });
        await user.save();
        return done(null, user);
      } catch (err) {
        console.error(err.message);
        done(err);
      }
    }
  )
);
