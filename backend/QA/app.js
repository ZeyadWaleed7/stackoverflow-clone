// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./config/mongo');

const app = express();

global.MONGO_URI = 'mongodb://127.0.0.1:27017/Stack-Overflow';
global.PORT = 5000;

connectDB();

app.use(express.json());
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
