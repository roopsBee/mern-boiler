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
    },
    githubId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
