const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./config/mongo');
const { connectToRabbitMQ } = require('./config/rabbitmq'); // Add this

// const { redisClient } = require('./config/redis');

const app = express();


// global.MONGO_URI = 'mongodb://127.0.0.1:27017/Stack-Overflow';
global.MONGO_URI = 'mongodb+srv://mohyEldeen_1234:1_gfPPvalnw@cluster0.pyjmtip.mongodb.net/Stack-Overflow';
global.PORT = 5000;

connectDB();

const startServices = async () => {
  try {
    // await connectDB();
    await connectToRabbitMQ(); // Initialize RabbitMQ connection
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Failed to start services:', error);
    process.exit(1);
  }
};

app.use(express.json());
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/comments', commentRoutes);

// Log Redis connection
// redisClient.connect().then(() => {
//   console.log('Connected to Redis');
// }).catch(err => {
//   console.error('Failed to connect to Redis:', err);
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
console.log("last but not least");
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

startServices();
