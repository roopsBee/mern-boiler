var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../../models/UserModel");

const useGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/redirect",
      },
      async (token, tokenSecret, { _json }, done) => {
        const { name, sub: googleId, email } = _json;

        try {
          const user = await User.findOne({ googleId });
          if (user) {
            return done(null, user);
          } else {
            const newUser = await new User({ name, email, googleId }).save();
            return done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
module.exports = useGoogleStrategy;
