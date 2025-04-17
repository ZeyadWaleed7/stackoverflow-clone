const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
