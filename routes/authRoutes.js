const express = require("express");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

const router = express.Router();

// @route   POST /auth/login
// @desc    login user
// @access  Public
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.isAuthenticated) {
    return res.status(200).json(req.user);
  }
  return res.status(501).json({ msg: "incorrect credentials" });
});

module.exports = router;
