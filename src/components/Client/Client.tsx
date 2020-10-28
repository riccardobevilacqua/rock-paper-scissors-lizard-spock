import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { MoveSelector } from '../MoveSelector/MoveSelector';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const Client: React.FunctionComponent<{}> = () => {
  const [userName, setUserName] = useState('');

  const createPlayer = () => {
    const userId = generateRandomString();
    const nick = `Player-${userId}`;
    setUserName(nick);
    socket.emit('joinServer', userId);
  };

  useEffect(() => {
    if (userName.length === 0) {
      createPlayer();
    }
  }, [userName]);

  return (
    <>
      <div>Welcome, {userName}!</div>
      <MoveSelector />
    </>
  );
};