require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const passport = require('passport');
const connectDB = require('./src/config/db');
require('./src/config/googleStrategy');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
