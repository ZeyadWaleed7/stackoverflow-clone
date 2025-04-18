require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

global.JWT_SECRET = process.env.JWT_SECRET;
global.MONGO_URI = process.env.MONGO_URI;
global.PORT = process.env.PORT || 5001;

const connectDB = async () => {
  try {
    await mongoose.connect(global.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(global.PORT, () => console.log(`Server is running on http://localhost:${global.PORT}`));
