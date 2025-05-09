const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answerText: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;

