var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../../models/UserModel");

const useGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      async (token, tokenSecret, { _json }, done) => {
        const { name, sub: googleId, email } = _json;
        console.log("find user");

        const user = await User.findOne({ googleId });
        if (user) {
          console.log("user found", user);
          return done(null, user);
        } else {
          const newUser = await new User({ name, email, googleId }).save();
          console.log("user created", newUser);
          return done(null, newUser);
        }
      }
    )
  );
};
module.exports = useGoogleStrategy;
