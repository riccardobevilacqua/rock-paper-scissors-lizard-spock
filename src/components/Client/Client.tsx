import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MoveSelector } from '../MoveSelector/MoveSelector';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const Client: React.FunctionComponent<{}> = () => {
  const [userId] = useState(generateRandomString());
  const [currentSelections, setCurrentSelections] = useState([]);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.emit('joinServer', userId);
  },
    // eslint-disable-next-line
    []
  );

  socket.on('showSelections', function (data: any) {
    if (!!data) {
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
      <MoveSelector socket={socket} userId={userId} />
      <div>
        {currentSelections.map((item: any) => (
          <div>Player-{item.userId}: {item.selection} {item.score > 0 ? `+${item.score}` : ''}</div>
        ))}
      </div>
      <div>
        <h3>Players</h3>
        <ol>
          {playerList.map((item: any) => (<li>Player-${item}</li>))}
        </ol>
      </div>
    </>
  );
};