import React from 'react';

import { Avatar } from '../Avatar/Avatar';

export interface PlayerScore {
  userId: string;
  score: number;
  isWinner: boolean;
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
            Player-{playerScore.userId}
          </div>
        </div>
        <div className="media-right">
          {playerScore.score > 0 ? playerScore.score : '-'}
        </div>
      </article>
    </div>
  );
}
