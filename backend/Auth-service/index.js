require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./src/config/db');
require('./src/config/googleStrategy'); 

const authRoutes = require('./src/routes/authRoutes');

const app = express();
connectDB();

app.use(passport.initialize()); 
app.use('/auth', authRoutes);   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CALLBACK_URL:", process.env.CALLBACK_URL);

