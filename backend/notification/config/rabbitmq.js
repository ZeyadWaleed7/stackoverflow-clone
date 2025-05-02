const amqp = require('amqplib');
require('dotenv').config();

let channel;

const connectToRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(process.env.QUEUE_NAME);
  console.log('Connected to RabbitMQ');
};

const getChannel = () => channel;

module.exports = { connectToRabbitMQ, getChannel };
