const { OAuth2Client } = require('google-auth-library');
const { generateJWT } = require('../services/jwt');
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

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const googleUser = await verifyGoogleToken(token);

    let user = await User.findOne({ googleId: googleUser.sub });
    if (!user) {
      user = new User({
        googleId: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
      });
      await user.save();
    }

    const jwtToken = generateJWT(user);
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
