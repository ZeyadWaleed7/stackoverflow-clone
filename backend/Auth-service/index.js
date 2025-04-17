// index.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./src/config/db');
require('./src/config/googleStrategy'); // Google OAuth setup

const authRoutes = require('./src/routes/authRoutes');

const app = express();
connectDB();

app.use(passport.initialize()); // Start Passport
app.use('/auth', authRoutes);   // Mount auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CALLBACK_URL:", process.env.CALLBACK_URL);

