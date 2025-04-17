const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/jwtService');

const router = express.Router();

// Step 1: Google Login Route
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Callback after Google Auth
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.json({ token }); // Return JWT to frontend
  }
);

module.exports = router;
