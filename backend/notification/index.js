const amqp = require('amqplib');
const { Server } = require('socket.io');
const http = require('http');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const NOTIFICATION_QUEUE = 'notifications';
const SOCKET_IO_PORT = process.env.PORT || 3000;

let channel;
let io;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: false });
    console.log(`Connected to RabbitMQ and asserted queue: ${NOTIFICATION_QUEUE}`);

    channel.consume(NOTIFICATION_QUEUE, (msg) => {
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());
        console.log('Received notification from RabbitMQ:', notification);
        io.emit('newNotification', notification);
        channel.ack(msg);
      }
    }, { noAck: false });

  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
  }
}

function startSocketIO() {
  const server = http.createServer();
  io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  server.listen(SOCKET_IO_PORT, () => {
    console.log(`Socket.IO server listening on port ${SOCKET_IO_PORT}`);
  });
}

async function startService() {
  await connectRabbitMQ();
  startSocketIO();
}

startService();