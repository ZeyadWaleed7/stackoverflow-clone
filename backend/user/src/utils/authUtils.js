const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const client = new OAuth2Client(global.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: global.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw new Error('Invalid Google token');
  }
};

const generateJWT = (user) => {
  return jwt.sign({ userId: user._id }, global.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { verifyGoogleToken, generateJWT };
