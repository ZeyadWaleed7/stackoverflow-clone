let ioInstance;

const initSocket = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  });
};

const emitNotification = (data) => {
  if (ioInstance) {
    ioInstance.emit('notification', data);
  }
};

module.exports = { initSocket, emitNotification };
