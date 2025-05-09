
const { getChannel } = require('../config/rabbitmq');

const publishToQueue = async (data) => {
  try {
    const channel = getChannel();
    const success = channel.sendToQueue(
      global.NOTIFICATION_QUEUE, 
      Buffer.from(JSON.stringify(data)),
      { persistent: true } 
    );
    
    if (!success) {
      throw new Error('Message could not be sent to queue');
    }
    
    console.log(`Message sent to queue ${global.NOTIFICATION_QUEUE}:`, data);
    return true;
  } catch (error) {
    console.error('Error publishing to queue:', error);
    throw error;
  }
};

module.exports = publishToQueue;