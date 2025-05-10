// const { createClient } = require('redis');

// class RedisClient {
//   constructor() {
//     this.client = createClient({
//       socket: {
//         url: process.env.REDIS_URL || 'redis://redis:6379'
//       }
//     });
//     this.client.on('error', (err) => console.error('Redis Client Error', err));
//     this.connected = false;
//   }

//   async connect() {
//     if (!this.connected) {
//       await this.client.connect();
//       this.connected = true;
//     }
//     return this.client;
//   }

//   async getAsync(key) {
//     return this.client.get(key);
//   }

//   async setAsync(key, value, expirationInSeconds = 3600) {
//     if (expirationInSeconds <= 0) {
//       return this.client.set(key, value); // No expiration if invalid
//     }
//     return this.client.set(key, value, {
//       EX: expirationInSeconds
//     });
//   }

//   async delAsync(key) {
//     return this.client.del(key);
//   }
// }

// const redisClient = new RedisClient();

// // Auto-connect
// redisClient.connect().catch(err => console.error('Redis initial connection error:', err));

// module.exports = {
//   redisClient,
//   getAsync: redisClient.getAsync.bind(redisClient),
//   setAsync: redisClient.setAsync.bind(redisClient),
//   delAsync: redisClient.delAsync.bind(redisClient),
// };

const { createClient } = require('redis');
const logger = require('../utils/logger');

class RedisClient {
  constructor() {
    this.client = createClient({
      socket: {
        url: process.env.REDIS_URL || 'redis://redis:6379',
        reconnectStrategy: (retries) => {
          const delay = Math.min(retries * 100, 5000);
          logger.warn(`Redis reconnecting attempt ${retries}, next try in ${delay}ms`);
          return delay;
        }
      },
      pingInterval: 10000 
    });
    
    this.client.on('error', (err) => logger.error('Redis Client Error:', err));
    this.client.on('connect', () => logger.info('Redis connecting...'));
    this.client.on('ready', () => logger.info('Redis ready'));
    this.client.on('reconnecting', () => logger.warn('Redis reconnecting...'));
    
    this.connected = false;
  }

  async connect() {
    if (!this.connected) {
      try {
        await this.client.connect();
        this.connected = true;
        logger.info('Redis connected successfully');
      } catch (err) {
        logger.error('Redis connection failed:', err);
        throw err;
      }
    }
    return this.client;
  }

  async getAsync(key) {
    try {
      const value = await this.client.get(key);
      logger.debug(`Redis GET ${key}`);
      return value;
    } catch (err) {
      logger.error(`Redis GET failed for key ${key}:`, err);
      throw err;
    }
  }

  async setAsync(key, value, expirationInSeconds = 3600) {
    try {
      const options = expirationInSeconds > 0 ? { EX: expirationInSeconds } : {};
      const result = await this.client.set(key, value, options);
      logger.debug(`Redis SET ${key} with TTL ${expirationInSeconds}s`);
      return result;
    } catch (err) {
      logger.error(`Redis SET failed for key ${key}:`, err);
      throw err;
    }
  }

  async delAsync(key) {
    try {
      const result = await this.client.del(key);
      logger.debug(`Redis DEL ${key}`);
      return result;
    } catch (err) {
      logger.error(`Redis DEL failed for key ${key}:`, err);
      throw err;
    }
  }

  async keysAsync(pattern) {
    try {
      return await this.client.keys(pattern);
    } catch (err) {
      logger.error(`Redis KEYS failed for pattern ${pattern}:`, err);
      throw err;
    }
  }
}

const redisClient = new RedisClient();

// Auto-connect with retry
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error('Redis initial connection failed:', err);
  }
})();

module.exports = {
  redisClient,
  getAsync: redisClient.getAsync.bind(redisClient),
  setAsync: redisClient.setAsync.bind(redisClient),
  delAsync: redisClient.delAsync.bind(redisClient),
  keysAsync: redisClient.keysAsync.bind(redisClient)
};