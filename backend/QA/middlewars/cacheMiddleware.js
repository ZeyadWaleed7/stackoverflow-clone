const cacheService = require('../services/cacheService');
const Question = require('../models/questionsModel');

module.exports = {
  checkContentCache: async (req, res, next) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) return next();

      const { 
        contentHash, 
        accesses,
        cacheKey 
      } = await cacheService.trackContentAccess(question.title, question.description);

      const cached = await cacheService.getCachedContent(contentHash);
      if (cached) {
        req.cacheHit = true;
        return res.status(200).json(cached);
      }

      if (accesses >= 3) {
        await cacheService.cacheContent(contentHash, question);
        console.log(`[CACHE] Stored content ${contentHash}`);
      }

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  }
};