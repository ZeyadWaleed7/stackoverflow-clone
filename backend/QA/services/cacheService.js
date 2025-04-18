const { getAsync, setAsync, incrAsync } = require('../config/redis');
const CACHE_TTL = 86400; 

module.exports = {
  trackQuestionAccess: async (questionId) => {
    const key = `question:access:${questionId}`;
    const accesses = await incrAsync(key);
    
    if (accesses === 1) {
      await client.expire(key, CACHE_TTL);
    }
    
    return accesses;
  },

  cacheFrequentQuestion: async (question) => {
    const key = `frequent:question:${question._id}`;
    await setAsync(key, JSON.stringify(question), 'EX', CACHE_TTL);
  },

  getCachedQuestion: async (questionId) => {
    const key = `frequent:question:${questionId}`;
    const cached = await getAsync(key);
    return cached ? JSON.parse(cached) : null;
  }
};