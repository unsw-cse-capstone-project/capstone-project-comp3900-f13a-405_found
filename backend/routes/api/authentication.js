const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { Errors, BadRequest } = require("../../utils/errors");

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
      req.user = user;
      next([]);
    })(req, res, next);
  },
  async (err, req, res, next) => {
    try {
      if (err.length > 0) {
        throw new BadRequest(err, true);
      }
      // Set cookie on succesful signup, so the user can access the dashboard directly, (no need to go through the login process again)
      const jwtPayload = {
        user: {
          id: req.user.id,
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
          // send a jwt httpOnly cookie that has the user id in it
          // might be good to have "secure" attribute set if
          // we're gonna deploy this using https :D
          res.cookie("token", token, { httpOnly: true });
          return res.status(200).json({
            success: true,
          });
        }
      );
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
            return res.status(200).json({
              success: true,
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
