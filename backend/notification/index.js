// backend/notification/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { 
  connectToRabbitMQ, 
  closeConnection, 
  QUEUE_NAMES // Use the directly exported constant
} = require('./config/rabbitmq');
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
const MPORT = process.env.MPORT || 15672;

const startApp = async () => {
  try {
    // First connect to RabbitMQ
    await connectToRabbitMQ();
    
    // Then start consumers
    await Promise.all([
      startNotificationConsumer(),
      startAnswerConsumer(),
      startCommentConsumer()
    ]);

    // Finally start the server
    server.listen(PORT, () => {
      console.log(`Notification Service running on http://localhost:${PORT}`);
      console.log(`RabbitMQ UI running on http://localhost:${MPORT}`);
      
      // Use the directly exported QUEUE_NAMES
      console.log('Listening for:');
      console.log(`- Notifications on queue: ${QUEUE_NAMES.NOTIFICATION}`);
      console.log(`- Answers on queue: ${QUEUE_NAMES.ANSWER}`);
      console.log(`- Comments on queue: ${QUEUE_NAMES.COMMENT}`);
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