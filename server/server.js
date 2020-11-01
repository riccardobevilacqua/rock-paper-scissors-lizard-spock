const express = require('express');
const socket = require('socket.io');

const { calculatePoints } = require('./calculatePoints');

const port = 4000;
const app = express();

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = socket(server);
// const victoryThreshold = 5;
let scoreBoard = [];
let currentSelections = [];

const updateScoreBoard = () => {
  const roundScores = calculatePoints(currentSelections);

  if (roundScores.length > 0) {
    scoreBoard = [...scoreBoard].map(item => {
      item.score += roundScores.find(current => item.userId === current.userId).score;

      return item;
    });
  }
};

io.on('connection', function (socket) {
  socket.on('joinServer', function (userId) {
    socket.userId = userId;
    scoreBoard.push({
      userId,
      score: 0
    });
    io.emit('joinServer', scoreBoard);
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

      if (scoreBoard.length === currentSelections.length) {
        updateScoreBoard();
        io.emit('showSelections', {
          currentSelections,
          scoreBoard
        });

        currentSelections = [];
      }

      console.log(`Player-${userId} selected ${selection}`);
    }
  });

  socket.on('disconnect', function () {
    scoreBoard = [...scoreBoard].filter(item => item.userId !== socket.userId);
    io.emit('leaveServer', socket.userId);
    console.log(`Player-${socket.userId} left.`);
  });
});