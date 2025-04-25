const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
