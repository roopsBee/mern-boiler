const express = require("express");
const passport = require("passport");

const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../../middleware");
const { invalidCredentials, loginSuccess, loggedOut } = require("../responses");

const router = express.Router();

// @route   POST /auth/login
// @desc    login user local strategy
// @access  Public
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", { failWithError: true }),
  (req, res, next) => {
    const { name, email } = req.user;
    const user = { name, email };
    return res.status(200).json({ ...loginSuccess, user });
  },
  (err, req, res, next) => {
    return res.status(401).json(invalidCredentials);
  }
);

// @route   DELETE /auth/logout
// @desc    logout
// @access  Public
router.delete("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  return res.status(200).json(loggedOut);
});

// @route   GET /auth/isauth
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
