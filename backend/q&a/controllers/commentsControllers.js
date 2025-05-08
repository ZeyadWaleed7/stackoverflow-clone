const Comment = require('../models/commentModel');
const Question = require('../models/questionsModel');
const { publishToQueue } = require('../config/rabbitmq');

// exports.createComment = async (req, res) => {
//   try {
//     const { questionId, answerId, content } = req.body;

//     const comment = new Comment({ questionId, answerId, content });
//     await comment.save();//to comments collection

//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     question.comments.push(comment);
//     await question.save();// to the comments' object in questions' collection (same as answers)

//     res.status(201).json(comment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.createComment = async (req, res) => {
  try {
    const { questionId, answerId, content } = req.body;
    const authorId = req.user?._id || 'anonymous'; // Assuming you have user auth

    const comment = new Comment({ questionId, answerId, content, authorId });
    await comment.save();

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.comments.push(comment);
    await question.save();

    // Publish comment event
    await publishToQueue('comment_events', {
      _id: comment._id,
      content: comment.content,
      authorId: comment.authorId,
      questionId: comment.questionId,
      answerId: comment.answerId,
      createdAt: comment.createdAt
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByQuestionId = async (req, res) => {
  try {
    const comments = await Comment.find({ questionId: req.params.questionId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getCommentsByAnswerId = async (req, res) => {
//   try {
//     const comments = await Comment.find({ answerId: req.params.answerId });
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
