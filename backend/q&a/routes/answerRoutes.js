const express = require('express');
const router = express.Router();
const {
  createAnswer,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer
} = require('../controllers/answersControllers');

router.post('/', createAnswer);
router.get('/question/:questionId', getAnswersByQuestionId);
router.put('/:id', updateAnswer);
router.delete('/:id', deleteAnswer);

module.exports = router;
