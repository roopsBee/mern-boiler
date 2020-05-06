const User = require("../models/UserModel");
const useLocalStrategy = require("./strategies/useLocalStrategy");
const useGoogleStrategy = require("./strategies/useGoogleStrategy");
const useGithubStrategy = require("./strategies/useGithubStrategy");

function initialize(passport) {
  useLocalStrategy(passport);
  useGoogleStrategy(passport);
  useGithubStrategy(passport);

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
