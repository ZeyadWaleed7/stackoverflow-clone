const { createClient } = require('redis');
const client = createClient({ url: 'redis://localhost:6379' });
client.on('error', (err) => console.error('Redis client error:', err));

const connectClient = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log('Redis client connected successfully');
  }
  return client;
};

module.exports = { connectClient };
