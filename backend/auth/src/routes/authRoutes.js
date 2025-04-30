const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/jwtService');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.json({ token }); 
  }
);

module.exports = router;
