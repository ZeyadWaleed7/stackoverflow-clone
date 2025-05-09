const express = require('express');
const mongoose = require('mongoose');
const app = express();
const voteRoutes = require('./routes/vote.route');
const { connectClient } = require('./redisClient');

app.use(express.json());


connectClient()
  .then(client => {
    console.log('Redis connected in app.js');
    global.redisClient = client;
  })
  .catch(err => {
    console.error('Redis connection error in app.js:', err);
  });


mongoose.connect('mongodb://localhost:27017/voteapp')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/vote', voteRoutes);

const Question = require('./models/Question');
const Answer = require('./models/Answer.model');


app.post('/questions', async (req, res) => {
  try {
    const { question, options } = req.body;
    const newQuestion = new Question({
      question,
      options,
      upvotes: 0,
      downvotes: 0
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ message: 'Error creating question', error: err.message });
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving question', error: err.message });
  }
});


app.post('/answers', async (req, res) => {
  try {
    const { answerText, questionId } = req.body;
    const answer = new Answer({
      answerText,
      questionId,
      upvotes: 0,
      downvotes: 0
    });
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    console.error('Error creating answer:', err);
    res.status(500).json({ message: 'Error creating answer', error: err.message });
  }
});

app.get('/answers/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving answer', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up and MongoDB/Redis are connected!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
