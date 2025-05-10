// const publishToQueue = require('../utils/messageQueue');

// const sendTestNotification = async (req, res) => {
//   const data = {
//     message: req.body.message,
//     user: req.body.user
//   };

//   await publishToQueue(data);
//   res.json({ success: true, message: 'Notification sent to queue.' }
//     ,{ noAck: false }
//   );
// };

// module.exports = { sendTestNotification };

const publishToQueue = require('../utils/messageQueue');

const sendTestNotification = async (req, res) => {
  try {
    const data = {
      message: req.body.message,
      user: req.body.user
    };

    await publishToQueue(data);
    res.json({ 
      success: true, 
      message: 'Notification sent to queue.',
      data: data
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to send notification',
      error: error.message
    });
  }
};

module.exports = { sendTestNotification };