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
    // Ask User Service to create or find user
    const userServiceUrl = `${process.env.USER_SERVICE_URL}/api/users`;

    console.log('Google profile:', {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : 'No email provided'
    });

    console.log('Attempting to connect to user service at:', userServiceUrl);
    if (!profile.id) {
      throw new Error('Google profile ID is missing');
    }

    // Create a user object with the data from Google
    const userData = {
      googleId: profile.id,
      name: profile.displayName || 'Google User',
      email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@google.com`
    };

    console.log('Sending user data to user service:', userData);

    // Send the request to the user service
    const response = await axios.post(userServiceUrl, userData);

    const user = response.data;
    console.log('User created/found:', user);

    // Generate token 
    const token = generateToken(user._id, user.name);
    console.log('Token generated successfully');

    // token is directly accessible as req.user.token
    return done(null, { token, user });
  } catch (err) {
    console.error('Error in Google authentication strategy:', err);
    console.error('Error details:', err.message);
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
    }
    return done(err, null);
  }
}));

