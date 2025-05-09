const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  answers: [{ type: AnswerSchema }],
  comments: [{ type: CommentSchema }],
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
