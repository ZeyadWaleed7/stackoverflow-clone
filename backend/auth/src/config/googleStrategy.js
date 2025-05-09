const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios');
const { generateToken } = require('../services/jwtService');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL || 'http://localhost:5000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userServiceUrl = `${process.env.USER_SERVICE_URL}/api/users`;

    if (!profile.id) {
      throw new Error('Google profile ID is missing');
    }

    const userData = {
      googleId: profile.id,
      name: profile.displayName || 'Google User',
      email: profile.emails?.[0]?.value || `${profile.id}@google.com`,
      image: profile.photos?.[0]?.value,
      bio: profile._json?.aboutMe || '',
      lastLogin: new Date()
    };

    const response = await axios.post(userServiceUrl, userData);
    const user = response.data;

    // Generate both access and refresh tokens
    const tokens = {
      accessToken: generateToken(user._id, user.name),
      refreshToken: generateToken(user._id, user.name, true), // true indicates it's a refresh token
      userImage: user.image // Include user image in the response
    };

    return done(null, { token: tokens, user });
  } catch (error) {
    console.error('Error in Google authentication:', error.message);
    return done(error, null);
  }
}));

