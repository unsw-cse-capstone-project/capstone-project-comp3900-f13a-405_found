// passport js auth middleware
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require("../models/UserModel");
const gravatar = require("gravatar");
const config = require("config");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      algorithms: ["HS256"]
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

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      algorithms: ["HS256"]
    },
    async (email, password, done) => {
      try {
        let user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, {message: "Invalid credentials"});
        }
        let validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {message: "Invalid credentials"});
        } 
        return done(null, user, {message: "Login successful"});
      } catch(error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.get("jwtSecret"),
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
      algorithms: ["HS256"]
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);