const express = require('express');
const router = express.Router();
const {
  createQuestion,
  addAnswerToQuestion,
  addCommentToQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getCache,
  postCache,
  getAllCachedQuestions
} = require('../controllers/questionsControllers');

///cache route before any parameterized routes
router.get('/cache', getAllCachedQuestions);
router.get('/cache/:key', getCache);
router.post('/cache', postCache);

router.post('/', createQuestion);
router.post('/:questionId/answers', addAnswerToQuestion);
router.post('/:questionId/comments', addCommentToQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
