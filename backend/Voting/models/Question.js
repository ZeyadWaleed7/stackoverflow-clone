const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  question: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Question', questionSchema);
