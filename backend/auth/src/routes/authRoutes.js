const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/jwtService');

const router = express.Router();
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    try {
      const token = req.user && req.user.token;
      
      if (!token) {
        console.error('No token found in req.user');
        return res.status(500).json({ error: 'No authentication token generated' });
      }
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

      // Redirect to frontend
      res.redirect(`${frontendUrl}/googlecallback?token=${token}`);
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);

// Google failure route
router.get('/google/failure', (req, res) => {
  res.status(401).json({ error: 'Google authentication failed' });
});

// Verify token route
router.get('/verify-token', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || process.env.JWT_SECRET);
    res.json({ valid: true, user: { userId: decoded.userId, name: decoded.name } });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
