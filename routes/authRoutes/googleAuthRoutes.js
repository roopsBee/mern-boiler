const express = require("express");
const passport = require("passport");
const { checkNotAuthenticated } = require("../../middleware");
const {
  CLIENT_AUTH_SUCCESS_URL,
  CLIENT_AUTH_FAILURE_URL,
} = require("../../serverConfig");

const router = express.Router();

// @route   GET /api/auth/google/login
// @desc    login user google strategy
// @access  Public
router.get(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("google", {
    failWithError: true,
    scope: ["profile", "email"],
  }),
  (err, req, res, next) => {
    console.log(err);
    return res.redirect(CLIENT_AUTH_FAILURE_URL);
  }
);

// @route   GET /api/auth/google/redirect
// @desc    login redirect for google strategy
// @access  Public
router.get(
  "/redirect",
  checkNotAuthenticated,
  passport.authenticate("google", { failWithError: true }),
  (req, res, next) => {
    return res.redirect(CLIENT_AUTH_SUCCESS_URL);
  },
  (err, req, res, next) => {
    console.log(err);
    return res.redirect(CLIENT_AUTH_FAILURE_URL);
  }
);

module.exports = router;
