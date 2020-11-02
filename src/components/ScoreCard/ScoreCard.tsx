import React from 'react';

import { Avatar } from '../Avatar/Avatar';

export interface PlayerScore {
  userId: string;
  score: number;
}

export interface ScoreCardProps {
  playerScore: PlayerScore;
}

export const ScoreCard: React.FunctionComponent<ScoreCardProps> = ({
  playerScore
}: ScoreCardProps) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <Avatar text={playerScore.userId} />
        </div>
        <div className="media-content">
          <div className="content">
            <p>Player-{playerScore.userId}</p>
            <p>{playerScore.score}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
