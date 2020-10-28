const express = require('express');
const socket = require('socket.io');

const port = 4000;
const app = express();

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = socket(server);
const activeUsers = new Set();
const currentSelections = {
  rock: [],
  paper: [],
  scissors: [],
  lizard: [],
  spock: [],
}

io.on('connection', function (socket) {
  socket.on('joinServer', function (userId) {
    socket.userId = userId;
    activeUsers.add(userId);
    io.emit('joinServer', [...activeUsers]);
    console.log(`Player-${userId} joined.`);
  });

  socket.on('setSelection', function (payload) {
    if (!!payload) {
      const { userId, selection } = payload;
      currentSelections[selection].push(userId);

      console.log(`Player-${userId} selected ${selection}`);
    }
  });

  socket.on('disconnect', function () {
    activeUsers.delete(socket.userId);
    io.emit('leaveServer', socket.userId);
    console.log(`Player-${socket.userId} left.`);
  });
});