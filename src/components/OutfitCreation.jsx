import React, {Component} from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import {database} from '../firebase.js';

class OutfitCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItems: []
    }
    this.getClickedItem = this.getClickedItem.bind(this);
  }

  getClickedItem(item) {
    // get the url and then add it to the array in state
    //console.log(item);
    let itemsArray = this.state.clickedItems.slice();
    itemsArray.push(item);
    this.setState({clickedItems: itemsArray});
  }

  render() {
    return (
      <div>
        OutfitCreation
        <DropZone clickedItems={this.state.clickedItems}/>
        <CategoryTabs getClickedItem={this.getClickedItem}/>
        <SaveOutfitButton uid={this.props.uid}/>
      </div>
    );
  }

}

export default OutfitCreation;
