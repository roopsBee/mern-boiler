const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const useLocalStrategy = require("./strategies/localStrategy");

function initialize(passport) {
  useLocalStrategy(passport);

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return User.findById(id, (err, user) => {
      user.password = null;
      done(err, user);
    });
  });
}

module.exports = initialize;
