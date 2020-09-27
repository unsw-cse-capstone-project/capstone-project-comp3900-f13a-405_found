const express = require("express");
const connectToMongoDB = require("./config/db");
const app = express();
// prevent mongodb injections
const mongoSanitize = require("express-mongo-sanitize");

connectToMongoDB();

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
app.use("/api/dashboard.js", require("./routes/api/dashboard"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
