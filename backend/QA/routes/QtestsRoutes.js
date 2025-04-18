const express = require('express');
const router = express.Router();
const {
  createQuestion,
  addAnswerToQuestion,
  addCommentToQuestion,
  getQuestionById
} = require('../controllers/QtestsController');

router.post('/', createQuestion);
router.post('/:questionId/answers', addAnswerToQuestion);
router.post('/:questionId/comments', addCommentToQuestion);
router.get('/:id', getQuestionById);

module.exports = router;
