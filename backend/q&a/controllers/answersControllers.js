const Answer = require('../models/answerModel');
const Question = require('../models/questionsModel');

exports.createAnswer = async (req, res) => {
  try {
    const { questionId, content } = req.body;

    
    const answer = new Answer({ questionId, content });
    await answer.save();// answer in answers

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.answers.push(answer);
    await question.save();// answer in questions's answers object

    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const answerId = req.params.id;
    const { content } = req.body;

    // Find and update the answer in the answers collection
    const answer = await Answer.findByIdAndUpdate(answerId, { content }, { new: true });
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    // Find the question associated with the answer and update the answer in the questions collection
    const question = await Question.findOne({ 'answers._id': answerId });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Update the answer in the question's answers array
    question.answers.id(answerId).content = content;
    await question.save();

    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
