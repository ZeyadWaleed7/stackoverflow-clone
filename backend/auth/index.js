require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./src/config/db');
require('./src/config/passport'); // Changed to use the passport.js config

const authRoutes = require('./src/routes/authRoutes');

const app = express();
connectDB();

app.use(passport.initialize()); 
app.use('/auth', authRoutes);   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));


