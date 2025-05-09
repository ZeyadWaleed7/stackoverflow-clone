// const amqp = require('amqplib');
// require('dotenv').config();

// let channel;
// let connection;

// const connectToRabbitMQ = async () => {
//   try {
//     connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
//     channel = await connection.createChannel();
    
//     global.NOTIFICATION_QUEUE = 'notification_queue';
//     await channel.assertQueue(global.NOTIFICATION_QUEUE, { durable: true });

    
//     global.ANSWER_QUEUE = 'answer_events';
//     global.COMMENT_QUEUE = 'comment_events';
//     await channel.assertQueue(global.ANSWER_QUEUE, { durable: true });
//     await channel.assertQueue(global.COMMENT_QUEUE, { durable: true });
    
//     console.log('Connected to RabbitMQ and declared queues:', {
//       notification: global.NOTIFICATION_QUEUE,
//       answer: global.ANSWER_QUEUE,
//       comment: global.COMMENT_QUEUE
//     });
//   } catch (error) {
//     console.error('Error connecting to RabbitMQ:', error);
//     throw error;
//   }
// };

// const getChannel = () => {
//   if (!channel) {
//     throw new Error('RabbitMQ channel not initialized');
//   }
//   return channel;
// };

// const closeConnection = async () => {
//   if (connection) await connection.close();
// };

// module.exports = { connectToRabbitMQ, getChannel, closeConnection };

const amqp = require('amqplib');
require('dotenv').config();

let connection;
let channel;
let isConnecting = false;

//  queues as constants
const QUEUE_NAMES = {
  NOTIFICATION: 'notification_queue',
  ANSWER: 'answer_events',
  COMMENT: 'comment_events'
};

const QUEUE_OPTIONS = {
  durable: true,
  arguments: {
    'x-queue-type': 'classic'
  }
};

const connectToRabbitMQ = async () => {
  if (channel) return channel;
  if (isConnecting) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (channel) {
          clearInterval(interval);
          resolve(channel);
        }
      }, 100);
    });
  }

  isConnecting = true;
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost', {
      heartbeat: 30
    });

    channel = await connection.createConfirmChannel();
    channel.prefetch(1);

    // Corrected Promise.all statement with proper parentheses
    await Promise.all(
      Object.values(QUEUE_NAMES).map(queueName => 
        channel.assertQueue(queueName, QUEUE_OPTIONS)
      ) 
    );

    console.log('RabbitMQ connected and queues verified');
    return channel;
  } catch (error) {
    console.error('RabbitMQ connection failed:', error);
    throw error;
  } finally {
    isConnecting = false;
  }
};


const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

const getQueues = () => QUEUE_NAMES; 

const closeConnection = async () => {
  if (channel) await channel.close();
  if (connection) await connection.close();
  channel = null;
  connection = null;
  console.log('RabbitMQ connection closed');
};

module.exports = {
  connectToRabbitMQ,
  getChannel,
  closeConnection,
  getQueues,
  QUEUE_NAMES // Also export the constant directly
};