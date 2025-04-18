const redis = require('redis');
const { promisify } = require('util');

// Singleton Redis client
let client;

function getRedisClient() {
  if (!client) {
    client = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
      }
    });

    client.on('error', (err) => console.error('Redis Client Error', err));
    
    // Auto-connect
    client.connect().catch(err => console.error('Redis connection error:', err));
  }
  return client;
}

// Promisified methods
const redisMethods = {
  getAsync: promisify(client?.get).bind(client),
  setAsync: promisify(client?.set).bind(client),
  incrAsync: promisify(client?.incr).bind(client),
  existsAsync: promisify(client?.exists).bind(client),
  delAsync: promisify(client?.del).bind(client),
  quitAsync: promisify(client?.quit).bind(client)
};

module.exports = {
  getRedisClient,
  ...redisMethods
};