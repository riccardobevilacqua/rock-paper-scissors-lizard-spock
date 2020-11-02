import React, { useState, useEffect } from 'react';

import { ScoreCard, PlayerScore } from '../ScoreCard/ScoreCard';

export interface ScoreBoardProps {
  scores: PlayerScore[];
  winner: string | null;
}

export const sortByScore = (a: PlayerScore, b: PlayerScore) => b.score - a.score;

export const ScoreBoard: React.FunctionComponent<ScoreBoardProps> = (props: ScoreBoardProps) => {
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    setScores(props.scores.sort(sortByScore));
  },
    [props.scores]
  );

  // <tr key={item.userId}>
  //   <td>{index + 1}</td>
  //   <td>Player-{item.userId}</td>
  //   <td>{item.score}</td>
  //   <td>{props.winner === item.userId ? 'WINNER' : ''}</td>
  // </tr>

  return (
    <>
      {scores.map((item: PlayerScore) => (
        <ScoreCard playerScore={item} key={item.userId} />
      ))}
    </>
  );
};