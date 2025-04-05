const express = require('express');
const passport = require('passport');
const connectDB = require('./src/config/db');
require('dotenv').config();
const { generateToken } = require('./src/services/jwtService');
require('./src/config/passport-setup');

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateToken(req.user.id);
    res.json({ token });
  }
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});