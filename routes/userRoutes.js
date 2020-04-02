const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { checkNotAuthenticated } = require("../middleware");

const router = express.Router();

// @route   POST /user
// @desc    Register user
// @access  Public
router.post(
  "/",
  checkNotAuthenticated,
  [
    //express validator middleware
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    //if there are errors return array of errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Input is invalid",
        severity: "error",
        errors: errors.array()
      });
    }

    const { name, password } = req.body;
    try {
      // Find if user email already exists
      let email = req.body.email.toLowerCase();
      let user = await User.findOne({ email });
      // If user already exists return error array
      if (user) {
        return res.status(400).json({
          message: "Email already exists",
          severity: "error"
        });
      }

      // user does not exist and no errors create user
      user = new User({
        name,
        email,
        password
      });

      // hash and salt password using bcrypt then save user
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      user.password = null;
      res.status(200).json({
        message: `User "${user.name}" Created`,
        severity: "success"
      });
    } catch (error) {
      user.password = null;
      console.error(error.message);
      res.status(500).json({ message: "server error", severity: "error" });
    }
  }
);

module.exports = router;
