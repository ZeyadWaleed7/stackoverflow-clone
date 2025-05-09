const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient({
      socket: {
        url: process.env.REDIS_URL || 'redis://redis:6379'
      }
    });
console.log("a7a");
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.connected = false;
  }

  async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
    }
    return this.client;
  }

  async getAsync(key) {
    return this.client.get(key);
  }

  async setAsync(key, value, expirationInSeconds = 3600) {
    if (expirationInSeconds <= 0) {
      return this.client.set(key, value); // No expiration if invalid
    }
    return this.client.set(key, value, {
      EX: expirationInSeconds
    });
  }

  async delAsync(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();

// Auto-connect
redisClient.connect().catch(err => console.error('Redis initial connection error:', err));

module.exports = {
  redisClient,
  getAsync: redisClient.getAsync.bind(redisClient),
  setAsync: redisClient.setAsync.bind(redisClient),
  delAsync: redisClient.delAsync.bind(redisClient),
};
