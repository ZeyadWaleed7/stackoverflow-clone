
// const { getChannel } = require('../config/rabbitmq');

// const publishToQueue = async (data) => {
//   try {
//     const channel = getChannel();
//     const success = channel.sendToQueue(
//       global.NOTIFICATION_QUEUE, 
//       Buffer.from(JSON.stringify(data)),
//       { persistent: true } 
//     );
    
//     if (!success) {
//       throw new Error('Message could not be sent to queue');
//     }
    
//     console.log(`Message sent to queue ${global.NOTIFICATION_QUEUE}:`, data);
//     return true;
//   } catch (error) {
//     console.error('Error publishing to queue:', error);
//     throw error;
//   }
// };

// module.exports = publishToQueue;

const { getChannel, QUEUES } = require('../config/rabbitmq');

const publishToQueue = async (data, queueName = 'NOTIFICATION') => {
  const channel = getChannel();
  const queue = QUEUES[queueName];
  
  if (!queue) {
    throw new Error(`Invalid queue name: ${queueName}`);
  }

  return new Promise((resolve, reject) => {
    try {
      const messageBuffer = Buffer.from(JSON.stringify(data));
      
      channel.sendToQueue(
        queue.name,
        messageBuffer,
        {
          persistent: true,
          headers: {
            'x-retry-count': 0,
            'x-created-at': Date.now()
          }
        },
        (err, ok) => {
          if (err) {
            console.error(`Message rejected to ${queue.name}:`, err);
            reject(err);
          } else {
            console.log(`Message published to ${queue.name}`);
            resolve(ok);
          }
        }
      );
    } catch (error) {
      console.error('Publish error:', error);
      reject(error);
    }
  });
};

module.exports = publishToQueue;