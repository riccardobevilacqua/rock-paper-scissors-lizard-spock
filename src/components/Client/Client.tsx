import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const Client: React.FunctionComponent<{}> = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const nick = `Player-${generateRandomString()}`;
    setUserName(nick);
    socket.emit('createPlayer',);
  }, []);

  return (
    <>
      <div>Welcome, {userName}!</div>
    </>
  );
};