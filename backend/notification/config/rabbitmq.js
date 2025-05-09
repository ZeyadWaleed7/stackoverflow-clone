// const connectToRabbitMQ = async () => {
//   const exchangeName = 'notifications_exchange';
//   await channel.assertExchange(exchangeName, 'direct', { durable: true });

//   // Declare a queue and bind it to the exchange
//   await channel.assertQueue(global.QUEUE_NAME, { durable: true });
//   await channel.bindQueue(global.QUEUE_NAME, exchangeName, '');
//   console.log('Connected to RabbitMQ');
//   console.log(`Connected to RabbitMQ and declared queue: ${global.QUEUE_NAME}`);

// };

// const getChannel = () => channel;


const amqp = require('amqplib');
require('dotenv').config();

let channel;
let connection;

const connectToRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    
    global.NOTIFICATION_QUEUE = 'notification_queue';
    await channel.assertQueue(global.NOTIFICATION_QUEUE, { durable: true });

    
    global.ANSWER_QUEUE = 'answer_events';
    global.COMMENT_QUEUE = 'comment_events';
    await channel.assertQueue(global.ANSWER_QUEUE, { durable: true });
    await channel.assertQueue(global.COMMENT_QUEUE, { durable: true });
    
    console.log('Connected to RabbitMQ and declared queues:', {
      notification: global.NOTIFICATION_QUEUE,
      answer: global.ANSWER_QUEUE,
      comment: global.COMMENT_QUEUE
    });
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

const closeConnection = async () => {
  if (connection) await connection.close();
};

module.exports = { connectToRabbitMQ, getChannel, closeConnection };