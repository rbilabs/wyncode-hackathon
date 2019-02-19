import React, { Component } from 'react';
import Bag from './Bag';
import Score from './Score';
import '../App.css';

class Game extends Component {
    constructor(props) {
        super(props);
        let arr = ['burger','logo','burger','logo','fries','fries'];
        var currentIndex = arr.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        this.state = {
          bags: arr,
          classes: ['down','down','down','down','down','down'],
          match: Array(2).fill(null),
          prev: null,
          score: "Find the Match!"
        };
       
    }
    startOver(){
        let arr = ['burger','logo','burger','logo','fries','fries']
        var currentIndex = arr.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        this.setState({bags: arr, match:  Array(2).fill(null), score: "Find the Match!"});
     }
    renderBag(i) {
        return (
          <Bag
            move={this.state.classes[i]}
            type={this.state.bags[i]}
            onClick={() => this.handleClick(i)}
          />
        );
    }

    handleClick(i) {
        const classes = this.state.classes.slice();
        const bags = this.state.bags.slice();
        // switch(classes[i]){
        //     case "down":
        //       classes[i] = 'up';
        //     break;
        //     case "up":
        //         imgg = burger;
        //     break;
        //     case "burger-up-down":
        //         imgg = burger;
        //     break;
        // }
        let score = null;
        let currentMatch = this.state.match.slice();
        if(currentMatch[0]!=null){
            currentMatch[1] = bags[i];
        }else{
            currentMatch[0] = bags[i];
            classes[i] = 'up';
            this.setState({classes: classes, match:  currentMatch, prev: i});
        }
        
        if(currentMatch[1]!=null){

            if(currentMatch[0] === currentMatch[1]){
                score = "You Win!";
                classes[i] = 'up';
                this.setState({classes: classes, score: score});
            }else{
                score = "You Lose!"
                classes[i] = 'up-down';
                classes[this.state.prev] = 'down';
                alert(this.state.prev);
                this.setState({classes: classes, score: score});
            }


        }
     }

  render() {
    return (
      <div>
      <Score score={this.state.score} 
             onClick={() => this.startOver()}/>
      <div className="game">
        {this.renderBag(0)}
        {this.renderBag(1)}
        {this.renderBag(2)}
        {this.renderBag(3)}
        {this.renderBag(4)}
        {this.renderBag(5)}
      </div>
      </div>  
    );
  }
}

export default Game;

