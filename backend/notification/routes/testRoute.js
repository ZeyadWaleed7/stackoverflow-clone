const express = require('express');
const router = express.Router();
const { sendTestNotification } = require('../controllers/notificationController');
const { ioInstance } = require('../sockets/socketHandler');
const { getChannel } = require('../config/rabbitmq');

router.post('/notify', sendTestNotification);

router.get('/health', async (req, res) => {
  try {
    const channel = getChannel();
    const queues = ['notification_queue', 'answer_events', 'comment_events'];
    const queueInfo = {};

    for (const queue of queues) {
      try {
        const info = await channel.checkQueue(queue);
        queueInfo[queue] = {
          messages: info.messageCount,
          consumers: info.consumerCount
        };
      } catch (error) {
        queueInfo[queue] = { error: error.message };
      }
    }

    res.json({
      status: 'ok',
      queues: queueInfo,
      socket: {
        connected: !!ioInstance,
        clients: ioInstance ? Object.keys(ioInstance.sockets.sockets).length : 0
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message,
      details: 'RabbitMQ connection might be down'
    });
  }
});

router.get('/clients', (req, res) => {
  if (ioInstance) {
    const clients = Object.keys(ioInstance.sockets.sockets);
    res.json({
      client_count: clients.length,
      clients: clients
    });
  } else {
    res.json({ 
      client_count: 0,
      clients: [],
      warning: 'Socket.IO not initialized'
    });
  }
});

module.exports = router;