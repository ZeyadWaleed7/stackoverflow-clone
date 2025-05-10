const { getAsync, setAsync, delAsync } = require('../config/redis');

// Only handling simple question caching based on question ID
const CACHE_TTL = {
  QUESTION: 3600, // 1 hour for individual questions
  QUESTIONS_LIST: 300, // 5 minutes for question lists
  FREQUENT_QUESTIONS: 86400 // 24 hours for frequent questions
};


module.exports = {
  cacheQuestion: async (questionId, questionData) => {
    await setAsync(`question:${questionId}`, JSON.stringify(questionData));
    console.log(`[CACHE] Cached question ${questionId}`);
  },

  getCachedQuestion: async (questionId) => {
    const cached = await getAsync(`question:${questionId}`);
    return cached ? JSON.parse(cached) : null;
  },

  invalidateQuestionCache: async (questionId) => {
    await delAsync(`question:${questionId}`);
    console.log(`[CACHE] Invalidated cache for question ${questionId}`);
  },

  invalidateQuestionsListCache: async () => {
    await delAsync('questions:all_questions'); 
    console.log('[CACHE] Invalidated questions list');
  },

  cacheQuestionsList: async (key, questions) => {
    await setAsync(`questions:${key}`, JSON.stringify(questions), {
      EX: CACHE_TTL.QUESTIONS_LIST
    });
  },

  getCachedQuestionsList: async (key) => {
    const cached = await getAsync(`questions:${key}`);
    return cached ? JSON.parse(cached) : null;
  },

  // cacheFrequentQuestion: async (questionId, questionData) => {
  //   await setAsync(`frequent:question:${questionId}`, JSON.stringify(questionData), {
  //     EX: CACHE_TTL.FREQUENT_QUESTIONS
  //   });
  // },

  // getCachedFrequentQuestion: async (questionId) => {
  //   const cached = await getAsync(`frequent:question:${questionId}`);
  //   return cached ? JSON.parse(cached) : null;
  // },

  // getCacheStats: async () => {
  //   const keys = await redisClient.keys('*');
  //   return {
  //     totalCachedItems: keys.length,
  //     // Add more stats as needed
  //   };
  // },

  cacheQuestionsList: async (key, questions) => {
    await setAsync(`questions:${key}`, JSON.stringify(questions), CACHE_TTL.QUESTIONS_LIST);
  }
};
