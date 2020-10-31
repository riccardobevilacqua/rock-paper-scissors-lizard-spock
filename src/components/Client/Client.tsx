import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MoveSelector } from '../MoveSelector/MoveSelector';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const Client: React.FunctionComponent<{}> = () => {
  const [userId] = useState(generateRandomString());
  const [currentSelections, setCurrentSelections] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [isRoundInProgress, setIsRoundInProgress] = useState(true);

  useEffect(() => {
    socket.emit('joinServer', userId);
  },
    // eslint-disable-next-line
    []
  );

  socket.on('showSelections', function (data: any) {
    if (!!data) {
      setIsRoundInProgress(false);
      setCurrentSelections(data);
    }
  });

  socket.on('joinServer', function (data: any) {
    if (!!data) {
      setPlayerList(data);
    }
  });

  return (
    <>
      <div>Welcome, Player-{userId}!</div>
      <div>Round {isRoundInProgress ? 'in progress' : 'is over'}</div>
      <MoveSelector socket={socket} userId={userId} isRoundInProgress={isRoundInProgress} />
      <div>
        {currentSelections.map((item: any) => (
          <div>Player-{item.userId}: {item.selection} {item.score > 0 ? `+${item.score}` : ''}</div>
        ))}
      </div>
      <div>
        <h3>Players</h3>
        <ol>
          {playerList.map((item: any) => (<li key={item}>Player-${item}</li>))}
        </ol>
      </div>
    </>
  );
};