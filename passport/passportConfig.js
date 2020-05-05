const User = require("../models/UserModel");
const useLocalStrategy = require("./strategies/useLocalStrategy");
const useGoogleStrategy = require("./strategies/useGoogleStrategy");

function initialize(passport) {
  useLocalStrategy(passport);
  useGoogleStrategy(passport);

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
