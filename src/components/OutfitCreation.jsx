import React, { Component } from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import { database } from '../firebase.js';

class OutfitCreation extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <div>
        OutfitCreation
        <CategoryTabs/>
      </div>
    );
  }

}

export default OutfitCreation;
