const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByQuestionId,
  getCommentsByAnswerId,
  updateComment,
  deleteComment
} = require('../controllers/commentsControllers');

router.post('/', createComment);
router.get('/question/:questionId', getCommentsByQuestionId);
router.get('/answer/:answerId', getCommentsByAnswerId);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
