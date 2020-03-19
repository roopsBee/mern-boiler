const express = require("express");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const { checkNotAuthenticated } = require("../middleware");

const router = express.Router();

// @route   POST /auth/login
// @desc    login user
// @access  Public
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local"),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

// @route   POST /auth/logout
// @desc    logout
// @access  Public
router.delete("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ msg: "logged out" });
});

module.exports = router;
