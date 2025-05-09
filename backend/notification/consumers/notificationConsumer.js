
// const startConsumer = async () => {
//   const channel = getChannel();
//   await channel.consume(global.QUEUE_NAME, (msg) => {
//     if (msg) {
//       const data = JSON.parse(msg.content.toString());
//       console.log('Received message from RabbitMQ:', data);
//       emitNotification(data); // Real-time via Socket.IO
//       channel.ack(msg); // Confirm message handled
//     }
//   });
// };

const { getChannel } = require('../config/rabbitmq');
const { emitNotification } = require('../sockets/socketHandler');

const startConsumer = async () => {
  try {
    const channel = getChannel();
    
    console.log(`Starting consumer for queue: ${global.NOTIFICATION_QUEUE}`);
    
    await channel.consume(global.NOTIFICATION_QUEUE, (msg) => {
      if (msg) {
        try {
          const data = JSON.parse(msg.content.toString());
          console.log('Received message from RabbitMQ:', data);
          
          // Emit to all connected clients
          emitNotification(data);
          
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          channel.nack(msg); 
        }
      }
    }, {
      noAck: false 
    });
  } catch (error) {
    console.error('Error starting consumer:', error);
    throw error;
  }
};

module.exports = startConsumer;