require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
require('./config/googleAuthConfig'); 

const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api/v1', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
