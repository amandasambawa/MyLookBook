import React, { Component } from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
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
        <DropZone/>
        <CategoryTabs/>
        <SaveOutfitButton uid={this.props.uid}/>
      </div>
    );
  }

}

export default OutfitCreation;
