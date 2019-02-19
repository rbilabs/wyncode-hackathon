import React, { Component } from 'react';
import bag from '../bag.png';
import burger from '../burger.png';
import logo from '../logo.png';
import fries from '../fries.jpg';


function Bag(props) {
    let imgg;
    switch(props.type){
        case "burger":
            imgg = burger;
        break;
        case "logo":
            imgg = logo;
        break;
        case "fries":
            imgg = fries;
        break;
        
        }
            
    return (
       <div className='bk-bag'>
        <img src={imgg} className={props.move} />
        <img src={bag} className='bag' onClick={props.onClick} />
       </div>
    );
}
  export default Bag;
