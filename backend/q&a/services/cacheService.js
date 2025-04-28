const crypto = require('crypto');
const { getAsync, setAsync, delAsync } = require('../config/redis');

function generateContentHash(title, description) {
  return crypto.createHash('sha256')
    .update(`${title.trim().toLowerCase()}|${description.trim().toLowerCase()}`)
    .digest('hex');
}

module.exports = {
  generateContentHash,

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
  }
};
