const crypto = require('crypto');
const { getAsync, setAsync, incrAsync, delAsync } = require('../config/redis');

// Generate consistent hash for question content
function generateContentHash(title, description) {
  return crypto.createHash('sha256')
    .update(`${title.trim().toLowerCase()}|${description.trim().toLowerCase()}`)
    .digest('hex');
}

module.exports = {
  // Track content access and manage caching
  trackContentAccess: async (title, description) => {
    const contentHash = generateContentHash(title, description);
    const accessKey = `content:access:${contentHash}`;
    const cacheKey = `content:cache:${contentHash}`;

    const accesses = await incrAsync(accessKey);
    
    // Set expiry only on first access (24 hours)
    if (accesses === 1) {
      await setAsync(accessKey, '1', 'EX', 86400);
    }

    return { contentHash, accesses, cacheKey };
  },

  // Cache question content
  cacheContent: async (contentHash, questionData) => {
    await setAsync(
      `content:cache:${contentHash}`,
      JSON.stringify(questionData),
      'EX', 
      3600 // 1 hour cache
    );
  },

  // Get cached content
  getCachedContent: async (contentHash) => {
    const cached = await getAsync(`content:cache:${contentHash}`);
    return cached ? JSON.parse(cached) : null;
  },

  // Invalidate cache for content
  invalidateContentCache: async (contentHash) => {
    await delAsync(`content:cache:${contentHash}`);
    await delAsync(`content:access:${contentHash}`);
  }
};