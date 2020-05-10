const express = require("express");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const {
  checkNotAuthenticated,
  checkValidationErrors,
} = require("../middleware");
const {
  registerEmailExists,
  userCreated,
  serverError,
} = require("./responses");

const router = express.Router();

// @route   POST /api/user
// @desc    Register user
// @access  Public
router.post(
  "/",
  checkNotAuthenticated,
  [
    //express validator middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  checkValidationErrors,
  async (req, res) => {
    const { name, password } = req.body;
    try {
      // Find if user email already exists
      let email = req.body.email.toLowerCase();
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json(registerEmailExists);
      }
      // create new user
      user = new User({
        name,
        email,
        password,
      });
      // hash and salt password using bcrypt then save user
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      user.password = null;
      res.status(200).json(userCreated(user.name));
    } catch (error) {
      console.error(error.message);
      res.status(500).json(serverError);
    }
  }
);

module.exports = router;
