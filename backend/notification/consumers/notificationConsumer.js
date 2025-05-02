const { getChannel } = require('../config/rabbitmq');
const { emitNotification } = require('../sockets/socketHandler');

const startConsumer = async () => {
  const channel = getChannel();
  await channel.consume(process.env.QUEUE_NAME, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Received message from RabbitMQ:', data);
      emitNotification(data); // Real-time via Socket.IO
      channel.ack(msg); // Confirm message handled
    }
  });
};

module.exports = startConsumer;
