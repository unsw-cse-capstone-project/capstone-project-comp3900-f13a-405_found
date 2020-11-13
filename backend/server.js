require("./auth/auth");
const express = require("express");
const checkAuth = require("./middleware/handleToken");
const errorHandler = require("./middleware/errorHandler");
const connectToMongoDB = require("./config/db");
const app = express();
// prevent mongodb injections
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const updateAccessTokenPeriodically = require("./utils/spotifyApiUtils");
const { checkAndSendEmailEveryOneHour } = require("./utils/notificationsUtils");

connectToMongoDB();
updateAccessTokenPeriodically();
checkAndSendEmailEveryOneHour();

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

// Protected Route, only logged in users can access this :p
app.use("/api/spotify", checkAuth, require("./routes/api/spotify"));

app.use("/api/secure", checkAuth, require("./routes/api/secure-routes"));

app.use("/api/subscription", checkAuth, require("./routes/api/subscription"));

app.use("/api/user-history", checkAuth, require("./routes/api/user-history"));

app.use("/api/playlist", checkAuth, require("./routes/api/playlist"));

app.use("/api/notifications", checkAuth, require("./routes/api/notifications"));

app.use(
  "/api/recommendations",
  checkAuth,
  require("./routes/api/recommendations")
);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
