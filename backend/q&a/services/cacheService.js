// const { getAsync, setAsync, delAsync } = require('../config/redis');

// // Only handling simple question caching based on question ID
// const CACHE_TTL = {
//   QUESTION: 3600, // 1 hour for individual questions
//   QUESTIONS_LIST: 300, // 5 minutes for question lists
//   FREQUENT_QUESTIONS: 86400 // 24 hours for frequent questions
// };


// module.exports = {
//   cacheQuestion: async (questionId, questionData) => {
//     await setAsync(`question:${questionId}`, JSON.stringify(questionData));
//     console.log(`[CACHE] Cached question ${questionId}`);
//   },

//   getCachedQuestion: async (questionId) => {
//     const cached = await getAsync(`question:${questionId}`);
//     return cached ? JSON.parse(cached) : null;
//   },

//   invalidateQuestionCache: async (questionId) => {
//     await delAsync(`question:${questionId}`);
//     console.log(`[CACHE] Invalidated cache for question ${questionId}`);
//   },

//   invalidateQuestionsListCache: async () => {
//     await delAsync('questions:all_questions'); 
//     console.log('[CACHE] Invalidated questions list');
//   },

//   cacheQuestionsList: async (key, questions) => {
//     await setAsync(`questions:${key}`, JSON.stringify(questions), {
//       EX: CACHE_TTL.QUESTIONS_LIST
//     });
//   },

//   getCachedQuestionsList: async (key) => {
//     const cached = await getAsync(`questions:${key}`);
//     return cached ? JSON.parse(cached) : null;
//   },
//   cacheQuestionsList: async (key, questions) => {
//     await setAsync(`questions:${key}`, JSON.stringify(questions), CACHE_TTL.QUESTIONS_LIST);
//   }
// };

const { getAsync, setAsync, delAsync, keysAsync } = require('../config/redis');
const logger = require('../utils/logger');

const CACHE_TTL = {
  QUESTION: 3600, // 1 hour
  QUESTIONS_LIST: 300, // 5 minutes
  FREQUENT_QUESTIONS: 86400 // 24 hours
};

const CACHE_PREFIX = {
  QUESTION: 'question:',
  QUESTIONS_LIST: 'questions:'
};

module.exports = {
  cacheQuestion: async (questionId, questionData) => {
    try {
      await setAsync(
        `${CACHE_PREFIX.QUESTION}${questionId}`, 
        JSON.stringify(questionData),
        CACHE_TTL.QUESTION
      );
      logger.info(`Cached question ${questionId}`);
    } catch (err) {
      logger.error(`Failed to cache question ${questionId}:`, err);
    }
  },

  getCachedQuestion: async (questionId) => {
    try {
      const cached = await getAsync(`${CACHE_PREFIX.QUESTION}${questionId}`);
      if (cached) {
        logger.debug(`Cache HIT for question ${questionId}`);
        return JSON.parse(cached);
      }
      logger.debug(`Cache MISS for question ${questionId}`);
      return null;
    } catch (err) {
      logger.error(`Failed to get cached question ${questionId}:`, err);
      return null;
    }
  },

  invalidateQuestionCache: async (questionId) => {
    try {
      const deleted = await delAsync(`${CACHE_PREFIX.QUESTION}${questionId}`);
      logger.info(`Invalidated cache for question ${questionId}, deleted: ${deleted}`);
      return deleted;
    } catch (err) {
      logger.error(`Failed to invalidate cache for question ${questionId}:`, err);
      return 0;
    }
  },

  invalidateQuestionsListCache: async () => {
    try {
      const keys = await keysAsync(`${CACHE_PREFIX.QUESTIONS_LIST}*`);
      if (keys.length > 0) {
        const deleted = await delAsync(keys);
        logger.info(`Invalidated ${keys.length} questions list cache keys, deleted: ${deleted}`);
        return deleted;
      }
      return 0;
    } catch (err) {
      logger.error('Failed to invalidate questions list cache:', err);
      return 0;
    }
  },

  cacheQuestionsList: async (key, questions) => {
    try {
      await setAsync(
        `${CACHE_PREFIX.QUESTIONS_LIST}${key}`,
        JSON.stringify(questions),
        CACHE_TTL.QUESTIONS_LIST
      );
      logger.info(`Cached questions list ${key}`);
    } catch (err) {
      logger.error(`Failed to cache questions list ${key}:`, err);
    }
  },

  getCachedQuestionsList: async (key) => {
    try {
      const cached = await getAsync(`${CACHE_PREFIX.QUESTIONS_LIST}${key}`);
      if (cached) {
        logger.debug(`Cache HIT for questions list ${key}`);
        return JSON.parse(cached);
      }
      logger.debug(`Cache MISS for questions list ${key}`);
      return null;
    } catch (err) {
      logger.error(`Failed to get cached questions list ${key}:`, err);
      return null;
    }
  },

  // inspect cache
  inspectCache: async () => {
    try {
      const questionKeys = await keysAsync(`${CACHE_PREFIX.QUESTION}*`);
      const listKeys = await keysAsync(`${CACHE_PREFIX.QUESTIONS_LIST}*`);
      return {
        questions: questionKeys,
        lists: listKeys
      };
    } catch (err) {
      logger.error('Failed to inspect cache:', err);
      return { questions: [], lists: [] };
    }
  }
};