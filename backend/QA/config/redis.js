const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
      }
    });

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

  async setAsync(key, value, options) {
    return this.client.set(key, value, options);
  }

  async incrAsync(key) {
    return this.client.incr(key);
  }

  async existsAsync(key) {
    return this.client.exists(key);
  }

  async delAsync(key) {
    return this.client.del(key);
  }

  async quitAsync() {
    if (this.connected) {
      await this.client.quit();
      this.connected = false;
    }
  }
}

const redisClient = new RedisClient();

// Auto-connect on first use
redisClient.connect().catch(err => console.error('Redis initial connection error:', err));

module.exports = {
  redisClient,
  getAsync: redisClient.getAsync.bind(redisClient),
  setAsync: redisClient.setAsync.bind(redisClient),
  incrAsync: redisClient.incrAsync.bind(redisClient),
  existsAsync: redisClient.existsAsync.bind(redisClient),
  delAsync: redisClient.delAsync.bind(redisClient),
  quitAsync: redisClient.quitAsync.bind(redisClient)
};