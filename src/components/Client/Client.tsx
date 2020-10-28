import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MoveSelector } from '../MoveSelector/MoveSelector';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const Client: React.FunctionComponent<{}> = () => {
  const [userId] = useState(generateRandomString());

  useEffect(() => {
    socket.emit('joinServer', userId);
  },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <div>Welcome, Player-{userId}!</div>
      <MoveSelector socket={socket} userId={userId} />
    </>
  );
};