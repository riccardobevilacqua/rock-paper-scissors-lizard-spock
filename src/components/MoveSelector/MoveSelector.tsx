import React, { useState, useEffect } from 'react';

import rockSVG from './img/rock.svg';
import paperSVG from './img/paper.svg';
import scissorsSVG from './img/scissors.svg';
import lizardSVG from './img/lizard.svg';
import spockSVG from './img/spock.svg';
import './MoveSelector.scss';

export interface Move {
  name: string;
  image: string;
}

const movesList: Move[] = [
  {
    name: 'rock',
    image: rockSVG,
  },
  {
    name: 'paper',
    image: paperSVG,
  },
  {
    name: 'scissors',
    image: scissorsSVG,
  },
  {
    name: 'lizard',
    image: lizardSVG,
  },
  {
    name: 'spock',
    image: spockSVG,
  }
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
  // eslint-disable-next-line
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

  const handleClick = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    if (!disabled) {
      console.log(`Selected: ${item}`);
      setSelection(item);
    }
  };

  const moves = movesList.map(item => {
    const { name, image } = item;
    // <button className="button" onClick={e => handleClick(e, item)} key={item} disabled={disabled}>
    //   {item}
    // </button>
    return (
      <figure className={['image', 'is-64x64', disabled ? 'is-disabled' : 'is-clickable'].join(' ')} onClick={e => handleClick(e, name)} key={name}>
        <img src={image} alt={name} />
      </figure>
    );
  });

  return (
    <div className="move-selector">
      {moves}
    </div>
  );
};
