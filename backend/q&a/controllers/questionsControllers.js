// const Question = require('../models/questionsModel');
// const Answer = require('../models/answerModel');
// const Comment = require('../models/commentModel');

// exports.createQuestion = async (req, res) => {
//   try {
//     const { title, description, tags } = req.body;
//     const question = new Question({ title, description, tags });
//     await question.save();
//     res.status(201).json(question);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.addAnswerToQuestion = async (req, res) => {
//   try {
//     const questionId = req.params.questionId;
//     const { content } = req.body;

    
//     const answer = new Answer({ questionId, content });
//     await answer.save();//answers collection

//     //question's answers array
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     question.answers.push(answer);
//     await question.save();//question's answers array

//     res.status(200).json(question);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.addCommentToQuestion = async (req, res) => {
//   try {
//     const questionId = req.params.questionId;
//     const { content } = req.body;

//     // Create a comment in the comments collection
//     const comment = new Comment({ questionId, content });
//     await comment.save();

//     // Add the comment to the question's comments array
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     question.comments.push(comment);
//     await question.save();

//     res.status(200).json(question);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getQuestionById = async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id).populate('answers.content comments.content');
//     if (!question) {
//       return res.status(404).json({ error: 'Question not found' });
//     }
//     res.status(200).json(question);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Question = require('../models/questionsModel');
const Answer = require('../models/answerModel');
const Comment = require('../models/commentModel');
const cacheService = require('../services/cacheService');

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = new Question({ title, description, tags });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addAnswerToQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const { content } = req.body;

    const answer = new Answer({ questionId, content });
    await answer.save();

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.answers.push(answer);
    await question.save();

    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCommentToQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const { content } = req.body;

    const comment = new Comment({ questionId, content });
    await comment.save();

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.comments.push(comment);
    await question.save();

    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('answers.content comments.content');
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('answers.content comments.content');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getCache = async (req, res) => {
  try {
    const { key } = req.params;
    const cached = await cacheService.getCachedContent(key);
    if (cached) {
      res.status(200).json(cached);
    } else {
      res.status(404).json({ error: 'Cache not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postCache = async (req, res) => {
  try {
    const { key, data } = req.body;
    await cacheService.cacheContent(key, data);
    res.status(200).json({ message: 'Cache stored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
