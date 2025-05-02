const { getChannel } = require('../config/rabbitmq');

const publishToQueue = async (data) => {
  const channel = getChannel();
  await channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(data)));
};

module.exports = publishToQueue;
