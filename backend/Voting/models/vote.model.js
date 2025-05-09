const mongoose = require('mongoose');
const VoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetId: mongoose.Schema.Types.ObjectId,
    type: { type: String, enum: ['question', 'answer'] },
    voteType: { type: String, enum: ['upvote', 'downvote'] },
    timestamp: { type: Date, default: Date.now },
  });
const Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;
