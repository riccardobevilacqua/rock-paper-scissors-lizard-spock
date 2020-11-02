import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { generateUserId } from '../../utils/utils';
import { MoveSelector } from '../MoveSelector/MoveSelector';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { PlayerScore } from '../ScoreCard/ScoreCard';

export interface MoveSelection {
  userId: string;
  selection: string;
  score: number;
}

const socket = io();
const userId = generateUserId();

// Time between two rounds (ms)
const roundTransitionTime = 2000;

export const Client: React.FunctionComponent<{}> = () => {
  // eslint-disable-next-line
  const [currentSelections, setCurrentSelections] = useState<MoveSelection[]>([]);
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [isRoundInProgress, setIsRoundInProgress] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.emit('joinServer', { userId });
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

  socket.on('endRound', function (data: any) {
    if (!!data) {
      setIsRoundInProgress(false);
      setCurrentSelections(data.currentSelections);
      setScores(data.scoreBoard);
      if (!!data.winner) {
        setWinner(data.winner);
      } else {
        nextRound();
      }
    }
  });

  socket.on('restartGame', function (data: any) {
    if (!!data) {
      setIsRoundInProgress(true);
      setScores(data.scoreBoard);
      setCurrentSelections([]);
      setWinner(null);
    }
  });

  const handlePlayAgain = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    socket.emit('playAgain');
  };

  return (
    <>
      <div>Welcome, Player-{userId}</div>
      <div>
        <MoveSelector socket={socket} userId={userId} isRoundInProgress={isRoundInProgress} />
        <ScoreBoard scores={scores} winner={winner} />
      </div>
      <div className={winner ? '' : 'is-hidden'}>
        <button className="button" onClick={e => handlePlayAgain(e)}>Play again</button>
      </div>
    </>
  );
};