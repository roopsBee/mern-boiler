const express = require("express");
const passport = require("passport");
const { checkNotAuthenticated } = require("../../middleware");
const {
  CLIENT_AUTH_SUCCESS_URL,
  CLIENT_AUTH_FAILURE_URL,
} = require("../../serverConfig");

const router = express.Router();

// @route   GET /auth/github/login
// @desc    login user github strategy
// @access  Public
router.get(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("github", {
    failWithError: true,
  }),
  (err, req, res, next) => {
    return res.redirect(CLIENT_AUTH_FAILURE_URL);
  }
);

// @route   GET /auth/github/redirect
// @desc    login redirect for github strategy
// @access  Public
router.get(
  "/redirect",
  checkNotAuthenticated,
  passport.authenticate("github", { failWithError: true }),
  (req, res, next) => {
    return res.redirect(CLIENT_AUTH_SUCCESS_URL);
  },
  (err, req, res, next) => {
    console.log(err);
    return res.redirect(CLIENT_AUTH_FAILURE_URL);
  }
);

module.exports = router;
