// passport js auth middleware
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const UserModel = require("../models/UserModel");
const config = require("config");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");

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
        const jwtPayload = {
          user: {
            email: email,
            name: req.body.name,
            password: req.body.password,
            optInEmail: req.body.optInEmail,
          },
        };
        jwt.sign(
          jwtPayload,
          config.get("jwtSecret"),
          {
            expiresIn: config.get("jwtExpirationTime"),
            algorithm: "HS256",
          },
          (err, token) => {
            if (err) throw new Errors([{ msg: "JWT error" }], true);
            let b64token = Buffer.from(token).toString("base64");
            let body = {
              from: `ultraCast <${config.get("email_account")}>`,
              to: email,
              subject: "Activate your account!",
              html: `<h2>Please click the link below to activate your acccount</h2><br>
                  <a href="http://localhost:3000/activate-email/${b64token}">Click this link </a>`,
            };

            const transporter = mailer.createTransport({
              service: "gmail",
              auth: {
                user: config.get("email_account"),
                pass: config.get("email_password"),
              },
            });
            transporter.verify(function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log("Server is ready to take our messages");
              }
            });

            transporter.sendMail(body, (err, result) => {
              if (err) {
                console.log(err);
                return done(null, null, { msg: "something went wrong" });
              }
              console.log(result);
              console.log("email sent");
              return done(null, {});
            });
          }
        );
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
