import User from "../models/User";
import localStrategy from ("passport-local").Strategy;
import bcrypt from "bcryptjs"
// const { Strategy } = require("passport-twitter");

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      {
        usernameField: "phone",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, phone, password, done) => {
        const user = await User.findOne({ phone });

        if (!user) {
          return done(null, false, {
            message: "This phone number is not registered",
          });
        }

        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "The password doesn't match the one on our records",
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};