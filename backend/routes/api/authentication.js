require("../../auth/auth");
const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");

// @route   POST api/authentication/signup
// @desc    Register a new user
// @access  Public
router.post(
  "/signup",
  [
    body("email", "Email is not valid").isEmail(),
    body("password", "Password must be 6 or more characters")
      .exists()
      .isLength({ min: 6 }),
  ],
  (req, res, next) => {
    // Validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: info.message,
            },
          ],
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  async (req, res, next) => {
    try {
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
          if (err) throw err;
          // send a jwt httpOnly cookie that has the user id in it
          // might be good to have "secure" attribute set if
          // we're gonna deploy this using https :D
          res.cookie("token", token, { httpOnly: true });
          res.json({
            success: true,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
