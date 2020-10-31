import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MoveSelector } from '../MoveSelector/MoveSelector';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const Client: React.FunctionComponent<{}> = () => {
  const [userId] = useState(generateRandomString());
  const [currentSelections, setCurrentSelections] = useState([]);
  const [scores, setScores] = useState([]);
  const [isRoundInProgress, setIsRoundInProgress] = useState(true);

  useEffect(() => {
    socket.emit('joinServer', userId);
  },
    // eslint-disable-next-line
    []
  );

  socket.on('showSelections', function (data: any) {
    if (!!data) {
      console.info(data);
      setIsRoundInProgress(false);
      setCurrentSelections(data.currentSelections);
      setScores(data.scoreBoard);
    }
  });

  return (
    <>
      <div>Welcome, Player-{userId}!</div>
      <div>Round {isRoundInProgress ? 'in progress' : 'is over'}</div>
      <MoveSelector socket={socket} userId={userId} isRoundInProgress={isRoundInProgress} />
      <div>
        {currentSelections.map((item: any) => (
          <div>Player-{item.userId}: {item.selection} {item.score > 0 ? `+${item.score} points` : ''}</div>
        ))}
      </div>
      <div>
        <ScoreBoard scores={scores} />
      </div>
    </>
  );
};