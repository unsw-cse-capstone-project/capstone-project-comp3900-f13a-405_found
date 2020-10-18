// 
// passport js auth middleware 
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/UserModel");
const gravatar = require("gravatar");
const config = require("config");
const jwt = require("jsonwebtoken");

// mailgun email app
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox280956bc09434c06a149245f4866d022.mailgun.org';
const mg = mailgun({apiKey: '5e4432559b816f10156fb0617ab6522b-2fbe671d-e66e83d1', domain: DOMAIN});


passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      algorithms: ["HS256"],
    },
    async (req, email, password, done) => {
      try {
        let user = await UserModel.findOne({ email: email });

        if (user) {
          return done(null, false, { message: "User Exists" });
        }

        const data = {
          from: 'noreply@test.com',
          to: email,
          subject: 'Hello',
          text: 'Testing some Mailgun awesomness!'
        };
        mg.messages().send(data, function (error, body) {
          console.log(body);
        });

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
      algorithms: ["HS256"],
    },
    async (email, password, done) => {
      try {
        let user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        let validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user, { message: "Login successful" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const tokenExtractorFromCookie = (req) => {
  let token = null;
  if (req && req.cookies.token) {
    token = req.cookies.token;
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.get("jwtSecret"),
      jwtFromRequest: tokenExtractorFromCookie,
      algorithms: ["HS256"],
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

