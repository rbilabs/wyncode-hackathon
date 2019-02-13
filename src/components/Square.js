import React, { Component } from 'react';
import timbit from '../images/timbit.png';

export default class Square extends Component {
  handleClick = () => {
    if (this.props.isActive) {
      this.props.onClick(this.props.id);
    }
  };

  render() {
    return (
      <div className="square" onClick={this.handleClick}>
        <img
          className={`timbit ${this.props.isActive ? 'active' : ''}`}
          src={timbit}
          alt="Timbit"
        />
        <div className="tim-hole" />
      </div>
    );
  }
}
