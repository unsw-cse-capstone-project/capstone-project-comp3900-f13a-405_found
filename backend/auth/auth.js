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
      //try {
        let user = await UserModel.findOne({ email: email });

        if (user) {
          return done(null, false, { message: "User Exists" });
        }

        const token = jwt.sign({name, email, password}, 'jsontokenactivate', {expiresIn: '20m'});

        const data = {
          from: 'noreply@ultracast.com',
          to: email,
          subject: 'Account Activation Link',
          html: `
            <h2>Please click on given link to activate account</h2>
            <p>http://localhost:3000/authentication/activate/${token}</p>
          `
        };
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json ({
              error: err.messagee
            })
          }
          return res.json({message: 'Email has been sent, activate your account'})
        });

        // user = new UserModel({
        //   name: req.body.name,
        //   email,
        //   avatar: gravatar.url(email, {
        //     s: "300",
        //     r: "pg",
        //     d: "mm",
        //   }),
        //   password: password,
        // });
      //   await user.save();
      //   return done(null, user);
      // } catch (err) {
      //   console.error(err.message);
      //   done(err);
      // }
    }
  )
);

// Verify token and create user account
exports.activateAccount = (req, res) => {
  const {token} = req.body;
  if (token) {
    jwt.verify(token, 'jsontokenactivate', function(err, decodedToken) {
      if (err) {
        return res.status(400).json({error: 'Incorrect or expired link.'})
      }
      const {name, email, password} = decodedToken;
      
      // Create user account
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
      } catch (err) {
          console.error("Error in signup while account activation: ", err);
          return res.status(400), json({error: "Error activating account"})
          done(err);
        }
    })
  } else {
    return res.json({error: "Something went wrong!!"})
  }
}

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

