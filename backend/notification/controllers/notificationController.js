const publishToQueue = require('../utils/messageQueue');

const sendTestNotification = async (req, res) => {
  const data = {
    message: req.body.message,
    user: req.body.user
  };

  await publishToQueue(data);
  res.json({ success: true, message: 'Notification sent to queue.' });
};

module.exports = { sendTestNotification };
