const express = require('express');
const passport = require('passport');
const { generateToken, verifyToken } = require('../services/jwtService');
const { authLimiter, googleAuthLimiter } = require('../middlewares/rateLimiter');
const { validateRefreshToken } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/google',
  googleAuthLimiter,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  googleAuthLimiter,
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    try {
      const { token, user } = req.user;
      const decodedToken = verifyToken(token.accessToken);

      console.log('\n=== Authentication Details ===');
      console.log('User ID:', decodedToken.userId);
      console.log('Access Token:', token.accessToken);
      console.log('===========================\n');

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/googlecallback?accessToken=${token.accessToken}&refreshToken=${token.refreshToken}&userImage=${encodeURIComponent(user.image || '')}`);
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);

router.post('/token/refresh',
  authLimiter,
  validateRefreshToken,
  async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await refreshAccessToken(refreshToken);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
);

router.get('/verify-token',
  authLimiter,
  (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ valid: false, error: 'No token provided' });
    }

    try {
      const decoded = verifyToken(token);
      res.json({ valid: true, user: { userId: decoded.userId, name: decoded.name } });
    } catch (error) {
      res.status(401).json({ valid: false, error: 'Invalid token' });
    }
  }
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({ error: 'Google authentication failed' });
});

router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
