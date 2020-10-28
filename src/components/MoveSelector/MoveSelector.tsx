import React from 'react';

const movesList: string[] = [
  'Rock',
  'Paper',
  'Scissors',
  'Lizard',
  'Spock'
];

export const MoveSelector: React.FunctionComponent<{}> = () => {
  const moves = movesList.map(item => (<button>{item}</button>));

  return (
    <>
      {moves}
    </>
  );
};
