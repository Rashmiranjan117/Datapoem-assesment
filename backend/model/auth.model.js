const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: String,
  image: String,
});

const AuthModel = mongoose.model("user", authSchema);

module.exports = { AuthModel };
