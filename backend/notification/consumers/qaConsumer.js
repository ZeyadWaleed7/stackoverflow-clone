const { getChannel } = require('../config/rabbitmq');
const { emitNotification } = require('../sockets/socketHandler');

const startAnswerConsumer = async () => {
  const channel = getChannel();
  await channel.consume(global.ANSWER_QUEUE, (msg) => {
    if (msg) {
      try {
        const answerData = JSON.parse(msg.content.toString());
        console.log('New answer received:', answerData);
        
        //  notification payload
        const notification = {
          message: `New answer posted: ${answerData.content.substring(0, 50)}...`,
          user: answerData.authorId || 'anonymous',
          type: 'answer',
          questionId: answerData.questionId,
          answerId: answerData._id
        };
        
        emitNotification(notification);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing answer:', error);
        channel.nack(msg);
      }
    }
  });
};

const startCommentConsumer = async () => {
  const channel = getChannel();
  await channel.consume(global.COMMENT_QUEUE, (msg) => {
    if (msg) {
      try {
        const commentData = JSON.parse(msg.content.toString());
        console.log('New comment received:', commentData);
        
        // notification payload
        const notification = {
          message: `New comment posted: ${commentData.content.substring(0, 50)}...`,
          user: commentData.authorId || 'anonymous',
          type: 'comment',
          commentId: commentData._id
        };
        
        emitNotification(notification);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing comment:', error);
        channel.nack(msg);
      }
    }
  });
};

module.exports = { startAnswerConsumer, startCommentConsumer };