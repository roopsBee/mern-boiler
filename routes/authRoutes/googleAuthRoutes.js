const express = require("express");
const passport = require("passport");
const { checkNotAuthenticated } = require("../../middleware");

const router = express.Router();

// @route   POST /auth/google/login
// @desc    login user google strategy
// @access  Public
router.get(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("google", {
    failWithError: true,
    scope: ["profile", "email"],
  }),
  (req, res, next) => {
    res.send("done");
  },
  (err, req, res, next) => {
    return res.status(401).json(invalidCredentials);
  }
);

// @route   POST /auth/google/redirect
// @desc    login redirect for google strategy
// @access  Public
router.get(
  "/redirect",
  checkNotAuthenticated,
  passport.authenticate("google", { failWithError: true }),
  (req, res, next) => {
    res.json(req.user);
  },
  (err, req, res, next) => {
    return res.status(401).json(invalidCredentials);
  }
);

module.exports = router;
