const socketio = require('socket.io')

let io;
const connections = {};

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { user } = socket.handshake.query
    connections[user] = socket.id
  })
};

exports.findConnections = (user) => {
  return connections[user] || null
}

exports.sendMessage = (socketClientId, message, data) => {
  io.to(socketClientId).emit(message, data)
}