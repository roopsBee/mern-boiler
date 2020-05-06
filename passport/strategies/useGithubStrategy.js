var GitHubStrategy = require("passport-github").Strategy;
const User = require("../../models/UserModel");

const useGithubStrategy = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/redirect",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, { _json, emails }, done) => {
        const email = emails[0].value;
        const { login: name, id: githubId } = _json;

        const user = await User.findOne({ githubId });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await new User({ name, email, githubId }).save();
          return done(null, newUser);
        }
      }
    )
  );
};
module.exports = useGithubStrategy;
