const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/jwtService');

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    const token = generateToken(req.user.id);
    res.json({ token });
  }
);

module.exports = router;
