const mongoose = require('mongoose');
const Question = require('../models/questionsModel');

const MONGO_URI = 'mongodb+srv://mohyEldeen_1234:1_gfPPvalnw@cluster0.pyjmtip.mongodb.net/Stack-Overflow';

async function testQuestionCount() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const questionTitle = 'test';
    const count = await Question.countDocuments({ title: questionTitle });

    if (count > 3) {
      console.log(`The question "${questionTitle}" exists more than 3 times.`);
    } else {
      console.log(`The question "${questionTitle}" does not exist more than 3 times.`);
    }

    await mongoose.connection.close();
  } catch (err) {
    console.error('Error testing question count:', err);
  }
}

testQuestionCount();
