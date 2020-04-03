const express = require("express");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated } = require("../middleware");

const router = express.Router();

// @route   POST /auth/login
// @desc    login user
// @access  Public
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local"),
  (req, res) => {
    const { name, email } = req.user;
    const user = { name, email };

    return res
      .status(200)
      .json({ message: "Login successful", severity: "success", user });
  }
);

// @route   DELETE /auth/logout
// @desc    logout
// @access  Public
router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  return res
    .status(200)
    .json({ message: "You have been logged out", severity: "success" });
});

// @route   DELETE /auth/isauth
// @desc    is user authenticated
// @access  Public
router.get("/isauth", (req, res) => {
  if (req.isAuthenticated()) {
    const { name, email } = req.user;
    const user = { name, email };
    return res.status(200).json({ isAuthenticated: true, user });
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
});

module.exports = router;
