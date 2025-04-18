const express = require('express');
const router = express.Router();
const {
  createQuestion,
  addAnswerToQuestion,
  addCommentToQuestion,
  getQuestionById
} = require('../controllers/questionsControllers');
const { checkQuestionCache } = require('../middlewares/cacheMiddleware');

router.post('/', createQuestion);
router.post('/:questionId/answers', addAnswerToQuestion);
router.post('/:questionId/comments', addCommentToQuestion);
router.get('/:id', getQuestionById);
router.get('/:id', checkQuestionCache, getQuestionById); // Added caching middleware

module.exports = router;