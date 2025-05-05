const redis = require('redis');
let clientInstance = null;
const client = redis.createClient({ 
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis max retries reached.');
        return Math.min(retries * 100, 3000);
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

client.on('reconnecting', () => {
  console.log('Redis client reconnecting...');
});

client.on('connect', () => {
  console.log('Redis client connected');
});

const connectClient = async () => {
  try {
    if (!clientInstance) {
      if (!client.isOpen) {
        await client.connect();
        console.log('Redis client connected successfully');
      }
      clientInstance = client;
    }
    return clientInstance;
  } catch (err) {
    console.error('Redis connection error:', err);
    throw err;
  }
};

module.exports = { connectClient };
