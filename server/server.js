const express = require('express');
const socket = require('socket.io');

const port = 4000;
const app = express();

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = socket(server);
const activeUsers = new Set();

io.on('connection', function (socket) {
  socket.on('createPlayer', function (userId) {
    socket.userId = userId;
    activeUsers.add(userId);
    io.emit('createPlayer', [...activeUsers]);
    console.log(`Player ${userId} joined the server.`);
  });
});