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
  isRoundInProgress: boolean;
}

export const MoveSelector: React.FunctionComponent<MoveSelectorProps> = ({
  socket,
  userId,
  isRoundInProgress,
}: MoveSelectorProps) => {
  const [selection, setSelection] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (selection.length > 0) {
      setDisabled(true);
      socket.emit('setSelection', {
        userId,
        selection,
      });
    }
  },
    // eslint-disable-next-line
    [selection]
  );

  useEffect(() => {
    setDisabled(!isRoundInProgress);
  },
    [isRoundInProgress]
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
    e.stopPropagation();
    setSelection(item);
  };

  const moves = movesList.map(item => (
    <button className="button" onClick={e => handleClick(e, item)} key={item} disabled={disabled}>
      {item}
    </button>
  ));

  return (
    <>
      {moves}
    </>
  );
};
