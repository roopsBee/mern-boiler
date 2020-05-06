const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
    },
    githubId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
