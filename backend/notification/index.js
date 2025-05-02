require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { connectToRabbitMQ } = require('./config/rabbitmq');
const { initSocket } = require('./sockets/socketHandler');
const startConsumer = require('./consumers/notificationConsumer');
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
  await connectToRabbitMQ();
  await startConsumer();

  server.listen(PORT, () => {
    console.log(`Notification Service running on http://localhost:${PORT}`);
  });
};

startApp();
