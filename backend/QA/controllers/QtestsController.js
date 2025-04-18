const cacheService = require('../services/cacheService');

// Add this at the top of getQuestionById
exports.getQuestionById = async (req, res) => {
  try {
    // Check cache first
    const cachedQuestion = await cacheService.getCachedQuestion(req.params.id);
    if (cachedQuestion) {
      return res.status(200).json(cachedQuestion);
    }

    const question = await Question.findById(req.params.id).populate('answers.content comments.content');
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Track access and cache if frequently accessed
    const accessCount = await cacheService.trackQuestionAccess(req.params.id);
    if (accessCount >= 3) {
      await cacheService.cacheFrequentQuestion(question);
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};