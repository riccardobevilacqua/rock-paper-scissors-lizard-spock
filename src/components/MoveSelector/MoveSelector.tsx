import React, { useState, useEffect } from 'react';

const movesList: string[] = [
  'Rock',
  'Paper',
  'Scissors',
  'Lizard',
  'Spock'
];

export interface MoveSelectorProps {
  socket: SocketIOClient.Socket;
  userName: string;
}

export const MoveSelector: React.FunctionComponent<MoveSelectorProps> = ({
  socket,
  userName,
}: MoveSelectorProps) => {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    if (selection.length > 0) {
      console.log(selection);
      socket.emit('setSelection', {
        selection,
        userName
      });
    }
  }, [
    selection,
    socket,
    userName
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
