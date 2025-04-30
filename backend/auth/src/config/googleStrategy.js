const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios');
const { generateToken } = require('../services/jwtService');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Ask User Service to create or find user
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/`, {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    });

    const user = response.data;

    // Generate JWT with both userId and name
    const token = generateToken(user._id, user.name);

    // Return both user and token
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

