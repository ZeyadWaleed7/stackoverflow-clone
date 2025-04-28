// const express = require('express');
// const router = express.Router();
// const {
//   createQuestion,
//   addAnswerToQuestion,
//   addCommentToQuestion,
//   getQuestionById
// } = require('../controllers/questionsControllers');
// const { checkQuestionCache } = require('../middlewars/cacheMiddleware');

// router.post('/', createQuestion);
// router.post('/:questionId/answers', addAnswerToQuestion);
// router.post('/:questionId/comments', addCommentToQuestion);
// router.get('/:id', getQuestionById);
// // router.get('/:id', checkQuestionCache, getQuestionById); // Added caching middleware

// module.exports = router;

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
  postCache
} = require('../controllers/questionsControllers');

router.post('/', createQuestion);
router.post('/:questionId/answers', addAnswerToQuestion);
router.post('/:questionId/comments', addCommentToQuestion);
router.get('/:id', getQuestionById);
router.get('/', getAllQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

router.get('/cache/:key', getCache);
router.post('/cache', postCache);

module.exports = router;
