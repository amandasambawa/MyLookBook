import React, {Component} from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import {database} from '../firebase.js';
import AlertContainer from 'react-alert';
import '../styles/OutfitCreation.css';

class OutfitCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItems: []
    }
    this.getClickedItem = this.getClickedItem.bind(this);
    this.undoItem = this.undoItem.bind(this);
  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'dark',
    //time: 50000,
    transition: 'fade'
  }

  getClickedItem(item) {
    // get the url and then add it to the array in state
    //console.log(item);
    if (this.state.clickedItems.length <= 5) {
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.push(item);
      this.setState({clickedItems: itemsArray});
    } else {
      this.msg.show('Reached Maximun(6) Items', {
        time: 20000,
        type: 'error'
        //icon: <img src="path/to/some/img/32x32.png"/>
      })
    }
  }

  undoItem() {
    console.log(this.state.clickedItems.length);
    if(this.state.clickedItems.length>=1){
      console.log("undo item");
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.pop();
      this.setState({clickedItems: itemsArray});
    }else{
      this.msg.show('There are no more items', {
        time: 20000,
        type: 'error'
        //icon: <img src="path/to/some/img/32x32.png"/>
      })
    }
  }

  render() {
    return (
        <div>
            <div className="outfitNameContainer">
                <div className="outfitName">OUTFIT #1</div>
            </div>
            <div>
                <DropZone clickedItems={this.state.clickedItems} undoItem={this.undoItem}/>
                <CategoryTabs getClickedItem={this.getClickedItem}/>
                <SaveOutfitButton uid={this.props.uid}/>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
            </div>
        </div>
    );
  }

}

export default OutfitCreation;
