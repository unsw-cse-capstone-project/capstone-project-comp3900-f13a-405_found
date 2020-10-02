const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectToMongoDB = require("./config/db");
const app = express();
// prevent mongodb injections
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const updateAccessTokenPeriodically = require("./utils/spotifyApiUtils");

connectToMongoDB();
updateAccessTokenPeriodically();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.get("/", (req, res) => {
  res.send("API Running");
});

// Routes
app.use("/api/authentication", require("./routes/api/authentication"));
app.use("/api/spotify", require("./routes/api/spotify"));

// Test route protected by JWT auth. Delete later
app.use(
  "/api/secure",
  passport.authenticate("jwt", { session: false }),
  require("./routes/api/secure-routes")
);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
