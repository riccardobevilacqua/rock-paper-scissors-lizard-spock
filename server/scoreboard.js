const calculateScores = input => {
  const scores = [...input].reduce((acc, item) => {
    acc[item.selection]++;

    return acc;
  }, {
    rock: 0,
    paper: 0,
    scissors: 0,
    lizard: 0,
    spock: 0
  });

  return [...input].map(item => {
    switch (item.selection) {
      case 'rock':
        item.score = scores.scissors + scores.lizard;
        break;
      case 'paper':
        item.score = scores.rock + scores.spock;
        break;
      case 'scissors':
        item.score = scores.paper + scores.lizard;
        break;
      case 'lizard':
        item.score = scores.paper + scores.spock;
        break;
      case 'spock':
        item.score = scores.rock + scores.scissors;
        break;
      default:
        item.score = 0;
    };

    return item;
  });
};

const updateScoreBoard = ({
  currentSelections,
  scoreBoard,
}) => {
  const roundScores = calculateScores(currentSelections);

  if (!roundScores) {
    return scoreBoard;
  }

  return [...scoreBoard].map(item => {
    item.score += roundScores.find(current => item.userId === current.userId).score;

    return item;
  });
};

module.exports = { updateScoreBoard };
