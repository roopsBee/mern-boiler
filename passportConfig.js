const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/UserModel");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { msg: "No user with that email" });
      }

      if (await bcrypt.compare(password, user.password)) {
        user.password = null;
        password = null;
        return done(null, user);
      } else {
        user.password = null;
        password = null;
        return done(null, false, { msg: "Password incorrect" });
      }
    } catch (error) {
      user.password = null;
      password = null;
      return done(error);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
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
