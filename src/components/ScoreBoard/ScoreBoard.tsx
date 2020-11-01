import React, { useState, useEffect } from 'react';

export interface PlayerScore {
  userId: string;
  score: number;
}

export interface ScoreBoardProps {
  scores: PlayerScore[];
}

export const sortByScore = (a: PlayerScore, b: PlayerScore) => b.score - a.score;

export const ScoreBoard: React.FunctionComponent<ScoreBoardProps> = (props: ScoreBoardProps) => {
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    setScores(props.scores.sort(sortByScore));
  },
    [props.scores]
  );

  return (
    <>
      <h3>Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item: PlayerScore, index: number) => (
            <tr key={item.userId}>
              <td>{index + 1}</td>
              <td>Player-{item.userId}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};