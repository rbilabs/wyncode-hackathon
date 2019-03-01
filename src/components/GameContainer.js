import React, { Component } from 'react';
import Game from './Game';

export default class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1,
      maxScore: 0
    };
  }

  incrementGameId = () => {
    this.setState(prevState => {
      const gameId = prevState.gameId + 1;
      return { gameId };
    });
  };

  setMaxScore = score => {
    this.setState({ maxScore: score });
  };

  render() {
    const { gameId, maxScore } = this.state;
    const autoPlay = gameId > 1;
    return (
      <div className="game">
        {!autoPlay && (
          <div className="welcome-screen">
            <img
              className="logo"
              src="https://www.timhortons.com/us/images/Tim_Hortons_Script.jpg"
              alt=""
            />
            <div className="max-score">
              <h2 className="title">Timbit-Dunker</h2>
              <div className="title-copy">
                Welcome to the timbit dunker! the goal? Dunk as many timbits in
                your coffe before the time runs out. click Start to begin
                <div className="score">
                  <button onClick={this.incrementGameId}>start</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {autoPlay && (
          <Game
            key={gameId}
            autoPlay={gameId > 1}
            boardSize={25}
            duration={10}
            timbitSpeed={1000}
            maxScore={maxScore}
            setMaxScore={this.setMaxScore}
            resetGame={this.incrementGameId}
          />
        )}
      </div>
    );
  }
}
