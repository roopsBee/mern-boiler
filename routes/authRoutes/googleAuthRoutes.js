const express = require("express");
const passport = require("passport");
const { checkNotAuthenticated } = require("../../middleware");

const router = express.Router();

// @route   GET /auth/google/login
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
    return res.redirect("/");
  }
);

// @route   GET /auth/google/redirect
// @desc    login redirect for google strategy
// @access  Public
router.get(
  "/redirect",
  checkNotAuthenticated,
  passport.authenticate("google", { failWithError: true }),
  (req, res, next) => {
    return res.redirect("/auth/success");
  },
  (err, req, res, next) => {
    console.log(err);
    return res.redirect(CLIENT_AUTH_FAILURE_URL);
  }
);

module.exports = router;
