const amqp = require('amqplib');

let connection = null;
let channel = null;
const queue = process.env.RABBITMQ_QUEUE || 'notifications';
const url = process.env.RABBITMQ_URL || 'amqp://localhost';

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(url);
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    console.log('Connected to RabbitMQ');

    process.on('exit', () => {
      if (connection) {
        console.log('Closing RabbitMQ connection');
        connection.close();
      }
    });

    return channel;

  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
  }
};

const consumeMessages = (callback) => {
  if (!channel) {
    console.error('RabbitMQ channel not established.');
    return;
  }

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const messageContent = msg.content.toString();
      console.log(`Received message: ${messageContent}`);
      callback(messageContent);
      channel.ack(msg);
    }
  }, { noAck: false });
};

module.exports = {
  connectRabbitMQ,
  consumeMessages,
};