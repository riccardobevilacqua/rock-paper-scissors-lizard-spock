const express = require('express');
const socket = require('socket.io');

const port = 4000;
const app = express();

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = socket(server);
const activeUsers = new Set();
let currentSelections = [];

const calculatePoints = (input) => {
  const scores = [...input].reduce((acc, item) => {
    acc[item.selection]++;

    return acc;
  }, {
    rock: 0,
    paper: 0,
    scissors: 0,
    lizard: 0,
    spock: 0
  });

  currentSelections = [...input].map(item => {
    switch (item.selection) {
      case 'rock':
        item.score = scores.scissors + scores.lizard;
        break;
      case 'paper':
        item.score = scores.rock + scores.spock;
        break;
      case 'scissors':
        item.score = scores.paper + scores.lizard;
        break;
      case 'lizard':
        item.score = scores.paper + scores.spock;
        break;
      case 'spock':
        item.score = scores.rock + scores.scissors;
        break;
      default:
        item.score = 0;
    };

    return item;
  });
};

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

      currentSelections.push({
        userId,
        selection,
        score: 0
      });

      if (activeUsers.size === currentSelections.length) {
        calculatePoints(currentSelections);
        io.emit('showSelections', currentSelections);

        currentSelections = [];
      }

      console.log(`Player-${userId} selected ${selection}`);
    }
  });

  socket.on('disconnect', function () {
    activeUsers.delete(socket.userId);
    io.emit('leaveServer', socket.userId);
    console.log(`Player-${socket.userId} left.`);
  });
});