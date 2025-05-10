const express = require('express');
const searchRoutes = require('./routes/searchRoutes');
const { connectRabbitMQ } = require('./config/rabbitMQ');
const { handleQuestionEvent } = require('./controllers/searchController');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use('/api/search', searchRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start RabbitMQ consumer
const startConsumer = async () => {
  const channel = await connectRabbitMQ();
  channel.consume('question_events', (msg) => {
    if (msg !== null) {
      const { eventType, data } = JSON.parse(msg.content.toString());
      handleQuestionEvent(eventType, data);
      channel.ack(msg);
    }
  });
};

startConsumer().catch((error) => {
  console.error('Failed to start RabbitMQ consumer:', error.message);
});

app.listen(PORT, () => console.log(`Search service running on http://localhost:${PORT}`));
