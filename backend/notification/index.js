

// const startApp = async () => {
//   await connectToRabbitMQ();
//   await startConsumer();

//   server.listen(PORT, () => {
//     console.log(`Notification Service running on http://localhost:${PORT}`);
//     console.log(`RabbitMQ Management running on http://localhost:${MQPORT}`);

//   });
// };


require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { connectToRabbitMQ, closeConnection } = require('./config/rabbitmq');
const { initSocket } = require('./sockets/socketHandler');
const startNotificationConsumer = require('./consumers/notificationConsumer');
const { startAnswerConsumer, startCommentConsumer } = require('./consumers/qaConsumer');
const testRoute = require('./routes/testRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api', testRoute);

initSocket(io);

const PORT = process.env.PORT || 4005;

const startApp = async () => {
  try {
    await connectToRabbitMQ();
    
    // all consumers
    await startNotificationConsumer();
    await startAnswerConsumer();
    await startCommentConsumer();

    server.listen(PORT, () => {
      console.log(`Notification Service running on http://localhost:${PORT}`);
      console.log('Listening for:');
      console.log(`- Notifications on queue: ${global.NOTIFICATION_QUEUE}`);
      console.log(`- Answers on queue: ${global.ANSWER_QUEUE}`);
      console.log(`- Comments on queue: ${global.COMMENT_QUEUE}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeConnection();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

startApp();