// backend/notification/consumers/notificationConsumer.js
const { getChannel, QUEUE_NAMES } = require('../config/rabbitmq');
const { emitNotification } = require('../sockets/socketHandler');

const startConsumer = async () => {
  const channel = getChannel();
  
  console.log(`Starting consumer for queue: ${QUEUE_NAMES.NOTIFICATION}`);
  
  await channel.consume(QUEUE_NAMES.NOTIFICATION, (msg) => {
    if (msg) {
      try {
        const data = JSON.parse(msg.content.toString());
        console.log('Processing message:', data);
        emitNotification(data);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(msg, false, true); // Requeue on failure
      }
    }
  }, {
    noAck: false
  });
  
  console.log('Consumer started successfully');
};

module.exports = startConsumer;