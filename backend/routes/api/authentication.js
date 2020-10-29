const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { Errors, BadRequest } = require("../../utils/errors");
const UserModel = require("../../models/UserModel");
const gravatar = require("gravatar");

// @route   POST api/authentication/signup
// @desc    Register a new user
// @access  Public
router.post(
  "/signup",
  [
    body("email", "Email is not valid").isEmail(),
    body("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  (req, res, next) => {
    // Validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    req.body.email = req.body.email.trim().toLowerCase();
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (!user) {
        next([
          {
            msg: info.message,
          },
        ]);
      }
      next([]);
    })(req, res, next);
  },
  async (err, req, res, next) => {
    try {
      if (err.length > 0) {
        throw new BadRequest(err, true);
      }
      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

// @route   POST api/authentication/login
// @desc    Login an existing user
// @access  Public
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(new BadRequest([{ msg: "Invalid Credentials" }]));
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(new BadRequest([{ msg: "Invalid Credentials" }]));
        }
        //
        // Set cookie on succesful signup, so the user can access the dashboard directly, (no need to go through the login process again)
        const jwtPayload = {
          user: {
            id: user.id,
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
            res.cookie("token", token, { httpOnly: true });

            user.set("password", undefined, { strict: false });

            return res.status(200).json({
              success: true,
              user: user,
            });
          }
        );
        //
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// @route   POST api/authentication/activate/:token
// @desc    Activate a user token
// @access  Public
router.post("/activate/:token", async (req, res, next) => {
  try {
    let asciiToken = Buffer.from(req.params.token, "base64").toString("ascii");
    const decoded = jwt.verify(asciiToken, config.get("jwtSecret"), {
      algorithms: ["HS256"],
    });
    let userfromtoken = decoded.user;
    let userCheck = await UserModel.findOne({ email: userfromtoken.email });

    if (userCheck) {
      console.log(userCheck);
      return res.status(400).json({ errors: [{ msg: "User Exists!" }] });
    }
    const user = new UserModel({
      name: userfromtoken.name,
      email: userfromtoken.email,
      avatar: gravatar.url(userfromtoken.email, {
        s: "300",
        r: "pg",
        d: "mm",
      }),
      password: userfromtoken.password,
      optInEmail: userfromtoken.optInEmail,
    });
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: [{ msg: "Invalid JWT!" }] });
  }
});

// @route   GET api/authentication/logout
// @desc    Logout an existing user
// @access  Public
router.get("/logout", async (req, res, next) => {
  res.clearCookie("token", { httpOnly: true });
  // At the moment this is not a secure logout. JWT token persists until its expiry.
  // This only clears the token on the client side.
  return res.status(200).json({ success: true });
});

module.exports = router;
