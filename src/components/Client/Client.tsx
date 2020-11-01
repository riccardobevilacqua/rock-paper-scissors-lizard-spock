import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { generateUserId } from '../../utils/utils';
import { MoveSelector } from '../MoveSelector/MoveSelector';
import { ScoreBoard, PlayerScore } from '../ScoreBoard/ScoreBoard';

const socket = io();
const userId = generateUserId();

// Time between two rounds (ms)
const roundTransitionTime = 2000;

export const Client: React.FunctionComponent<{}> = () => {
  const [currentSelections, setCurrentSelections] = useState([]);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [isRoundInProgress, setIsRoundInProgress] = useState(true);

  useEffect(() => {
    socket.emit('joinServer', userId);
  },
    // eslint-disable-next-line
    []
  );

  const nextRound = () => {
    setTimeout(() => {
      setCurrentSelections([]);
      setIsRoundInProgress(true);
    }, roundTransitionTime);
  }

  socket.on('joinServer', function (data: PlayerScore[]) {
    if (!!data) {
      setScores(data);
    }
  });

  socket.on('showSelections', function (data: any) {
    if (!!data) {
      setIsRoundInProgress(false);
      setCurrentSelections(data.currentSelections);
      setScores(data.scoreBoard);
      nextRound();
    }
  });

  return (
    <>
      <div>Welcome, Player-{userId}!</div>
      <div>Round {isRoundInProgress ? 'in progress' : 'is over'}</div>
      <MoveSelector socket={socket} userId={userId} isRoundInProgress={isRoundInProgress} />
      <div>
        {currentSelections.map((item: any) => (
          <div key={item.userId}>Player-{item.userId}: {item.selection} {item.score > 0 ? `+${item.score} points` : ''}</div>
        ))}
      </div>
      <div>
        <ScoreBoard scores={scores} />
      </div>
    </>
  );
};