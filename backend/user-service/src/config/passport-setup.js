const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in the db
        let existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // If not, create a new user in the db
        const newUser = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        }).save();
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));