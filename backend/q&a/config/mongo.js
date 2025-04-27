const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(global.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    process.exit(1);
  }
};

module.exports = connectDB;


// global.MONGO_URI = "mongodb+srv://mohyEldeen_1234:1_gfPPvalnw@cluster0.pyjmtip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Stack-Overflow";
// global.MONGO_URI = 'mongodb://127.0.0.1:27017/Stack-Overflow';
