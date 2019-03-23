import React, { Component, Fragment } from 'react';
import Square from './Square';
import Score from './Score';

const createTimbits = (amount, range) => {
  let set = new Set();
  while (set.size < amount) {
    set.add(Math.floor(Math.random() * range));
  }
  return [...set];
};

const gameMessages = {
  start: 'start',
  playing: 'go go go!!!',
  over: 'play again'
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      activeTimbits: [],
      remainingSeconds: this.props.duration
    };
  }

  /* instance properties */
  boardSize = [...Array(this.props.boardSize).keys()];
  gameState = 'playing';

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame();
    }
  }

  /* clear interval */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /* starts the game and creates game intervals based on the timbitSpeed prop */
  startGame = () => {
    this.gameState = 'playing';
    if (this.timer) {
      this.timer = clearInterval(this.timer);
      return null;
    }
    this.timer = setInterval(() => {
      this.setState(prevState => {
        const randomTimbitAmount = Math.floor(
          Math.random() * (this.props.boardSize / 2)
        );
        const activeTimbits = createTimbits(
          randomTimbitAmount,
          this.props.boardSize
        );
        /* decrease seconds and check for game over */
        const remainingSeconds = prevState.remainingSeconds - 1;
        if (remainingSeconds === 0) {
          this.timer = clearInterval(this.timer);
          this.gameState = 'over';
          const { score } = this.state;
          if (score > this.props.maxScore) {
            this.props.setMaxScore(score);
          }
          return { score: 0, activeTimbits: [], remainingSeconds: 0 };
        }
        return { activeTimbits, remainingSeconds };
      });
    }, this.props.timbitSpeed);
  };

  /* update score */
  handleClick = id => {
    this.setState(prevState => {
      const activeTimbits = prevState.activeTimbits.filter(v => v !== id);
      const score = prevState.score + 1;
      return { score, activeTimbits };
    });
  };

  render() {
    const { activeTimbits, score, remainingSeconds } = this.state;
    const { maxScore, resetGame } = this.props;
    return (
      <Fragment>
        <div className="board">
          {this.boardSize.map((cell, i) => {
            const isActive = activeTimbits.includes(i);
            return (
              <Square
                onClick={this.handleClick}
                key={cell}
                id={i}
                isActive={isActive}
              />
            );
          })}
        </div>
        <Score
          score={score}
          remainingSeconds={remainingSeconds}
          gameState={this.gameState}
          message={gameMessages[this.gameState]}
          maxScore={maxScore}
          onClick={resetGame}
        />
      </Fragment>
    );
  }
}

export default Game;
