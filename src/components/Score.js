import React, { Component } from 'react';

export default class Score extends Component {
  render() {
    const {
      score,
      gameState,
      message,
      maxScore,
      remainingSeconds
    } = this.props;
    const isClickable = gameState === 'start' || gameState === 'over';
    return (
      <div className="score">
        <div>time: {remainingSeconds}</div>
        <div>score: {score}</div>
        <button
          onClick={isClickable ? this.props.onClick : null}
          disabled={!isClickable}
        >
          {message}
        </button>
        <h2>max-score: {maxScore}</h2>
      </div>
    );
  }
}
