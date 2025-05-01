const config = {
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    socketPort: process.env.PORT || 3001
  };
  
  module.exports = config;