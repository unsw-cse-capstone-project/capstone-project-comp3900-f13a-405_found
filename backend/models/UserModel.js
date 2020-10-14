const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
  verfication_token: {
    type: String,
  },
  permalink: {
    type: String, 
  },
});

// Secret code connected to the user's email
// const secretCode = new mongoose.Schema({
//   email
// });



UserSchema.pre("save", async function (next) {
  // prehook function to hash the password before being stored in the db
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
