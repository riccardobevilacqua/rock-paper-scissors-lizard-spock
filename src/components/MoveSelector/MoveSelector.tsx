import React, { useState, useEffect } from 'react';

const movesList: string[] = [
  'rock',
  'paper',
  'scissors',
  'lizard',
  'spock'
];

export interface MoveSelectorProps {
  socket: SocketIOClient.Socket;
  userId: string;
}

export const MoveSelector: React.FunctionComponent<MoveSelectorProps> = ({
  socket,
  userId,
}: MoveSelectorProps) => {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    if (selection.length > 0) {
      console.log(selection);
      socket.emit('setSelection', {
        userId,
        selection,
      });
    }
  }, [
    selection,
    socket,
    userId
  ]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
    e.stopPropagation();
    setSelection(item);
  };

  const moves = movesList.map(item => (
    <button onClick={e => handleClick(e, item)} key={item}>
      {item}
    </button>
  ));

  return (
    <>
      {moves}
    </>
  );
};
