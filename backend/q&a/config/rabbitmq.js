const amqp = require('amqplib');
require('dotenv').config();

let channel;
let connection;

const connectToRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    
    
    await channel.assertQueue('answer_events', { durable: true });
    await channel.assertQueue('comments_events', { durable: true });
    
    console.log('Connected to RabbitMQ from Q&A service');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel not initialized');
  }
  return channel;
};

const publishToQueue = async (queueName, data) => {
  try {
    const ch = getChannel();
    await ch.sendToQueue(
      queueName, 
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    console.log(`Published to ${queueName}:`, data);
  } catch (error) {
    console.error('Error publishing to queue:', error);
    throw error;
  }
};

module.exports = { connectToRabbitMQ, getChannel, publishToQueue };