const crypto = require('crypto');
const { getAsync, setAsync, incrAsync, delAsync } = require('../config/redis');

function generateContentHash(title, description) {
  return crypto.createHash('sha256')
    .update(`${title.trim().toLowerCase()}|${description.trim().toLowerCase()}`)
    .digest('hex');
}

module.exports = {
  trackContentAccess: async (title, description) => {
    const contentHash = generateContentHash(title, description);
    const accessKey = `content:access:${contentHash}`;
    const cacheKey = `content:cache:${contentHash}`;

    const accesses = await incrAsync(accessKey);
    
    if (accesses === 1) {
      await setAsync(accessKey, '1', 'EX', 86400);
    }

    return { contentHash, accesses, cacheKey };
  },

  cacheContent: async (contentHash, questionData) => {
    await setAsync(
      `content:cache:${contentHash}`,
      JSON.stringify(questionData),
      'EX', 
      3600 // 1 hour cache
    );
  },

  getCachedContent: async (contentHash) => {
    const cached = await getAsync(`content:cache:${contentHash}`);
    return cached ? JSON.parse(cached) : null;
  },

  invalidateContentCache: async (contentHash) => {
    await delAsync(`content:cache:${contentHash}`);
    await delAsync(`content:access:${contentHash}`);
  }
};