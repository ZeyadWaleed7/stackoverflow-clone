
const Question = require('../models/questionsModel');
const Answer = require('../models/answerModel');
const Comment = require('../models/commentModel');
const cacheService = require('../services/cacheService');
const { publishToQueue } = require('../config/rabbitmq');


// Helper function to generate cache key
// function getCacheKey(title, description) {
//   return cacheService.generateContentHash(title, description);
// }

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
    const { questionId } = req.params;
    const { content } = req.body;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const answer = new Answer({ content });
    question.answers.push(answer);
    await question.save();

    // Invalidate cache after update
    const contentHash = getCacheKey(question.title, question.description);
    await cacheService.invalidateContentCache(contentHash);

    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCommentToQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const comment = new Comment({ content });
    question.comments.push(comment);
    await question.save();

    // Invalidate cache after update
    const contentHash = getCacheKey(question.title, question.description);
    await cacheService.invalidateContentCache(contentHash);

    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    
    const cachedQuestion = await cacheService.getCachedQuestion(questionId);
    if (cachedQuestion) {
      return res.status(200).json(cachedQuestion);
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    await cacheService.cacheQuestion(questionId, question);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const cacheKey = 'all_questions';
    const cachedQuestions = await cacheService.getCachedQuestionsList(cacheKey);
    
    if (cachedQuestions) {
      console.log('[CACHE] HIT for all questions');
      return res.status(200).json(cachedQuestions);
    }

    const questions = await Question.find().populate('answers comments');
    await cacheService.cacheQuestionsList(cacheKey, questions); 
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error in getAllQuestions:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndUpdate(questionId, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    await cacheService.invalidateQuestionCache(questionId); 
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndDelete(questionId);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Invalidate both caches
    await cacheService.invalidateQuestionCache(questionId);
    await cacheService.invalidateQuestionsListCache();
    
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getCache = async (req, res) => {
//   try {
//     const { key } = req.params;
//     const cached = await cacheService.getCachedContent(key);

//     if (cached) {
//       res.status(200).json(cached);
//     } else {
//       res.status(404).json({ error: 'Cache not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.postCache = async (req, res) => {
//   try {
//     const { key, data } = req.body;
//     await cacheService.cacheContent(key, data);
//     res.status(200).json({ message: 'Cache stored successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllCachedQuestions = async (req, res) => {
//   try {
//     const cachedQuestions = await cacheService.getAllCachedContent();
//     res.status(200).json(cachedQuestions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// {
//   "key": "test",
//   "data": {
//     "title": "test",
//     "description": "test",
//     "tags": ["sample", "question"]
//     }
// }
