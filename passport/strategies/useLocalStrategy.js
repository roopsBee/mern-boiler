const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModel");

const useLocalStrategy = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      email = email.toLowerCase();
      const user = await User.findOne({ email, password: { $exists: true } });
      if (!user) {
        return done(null, false, { message: "invalid email" });
      }

      if (await bcrypt.compare(password, user.password)) {
        user.password = null;
        password = null;
        return done(null, user);
      } else {
        user.password = null;
        password = null;
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      user.password = null;
      password = null;
      return done(error);
    }
  };

  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
};

module.exports = useLocalStrategy;
