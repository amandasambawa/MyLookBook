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
      clickedItems: [],
      title:"",
      global: false
    }
    this.getClickedItem = this.getClickedItem.bind(this);
    this.undoItem = this.undoItem.bind(this);
    this.nameOutfit = this.nameOutfit.bind(this);
    this.handleGlobalLock = this.handleGlobalLock.bind(this);

  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'dark',
    //time: 50000,
    transition: 'fade'
  }



  //handles the global Lock state
  handleGlobalLock() {
    if(this.state.global === false){
      this.setState({global:true})
      this.props.setGlobal(Boolean(true));
    }else{
      this.setState({global:false});
      this.props.setGlobal(Boolean(false));
    }

  }

  getClickedItem(item) {
    // get the url and then add it to the array in state
    if (this.state.clickedItems.length <= 5) {
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.push(item);
      this.setState({clickedItems: itemsArray});
    } else {
      this.msg.show('Reached Maximum(6) Items', {
        time: 20000,
        type: 'error'

      })
    }
  }

  undoItem() {
    //console.log(this.state.clickedItems.length);
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

  nameOutfit(event){
    this.setState({title:event.target.value});
    this.props.setTitle(event.target.value);


  }

  render() {
    console.log(this.props);
    return (
        <div id="outfitCreationContainer">
            <input id="outfitNameField" placeholder="Your outfit name here" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/>
            {/*
            <div id="outfitNameContainer">
                <input className="outfitName" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/>
            </div>
            */}
            <div>
                <DropZone clickedItems={this.state.clickedItems} undoItem={this.undoItem}/>
                <CategoryTabs getClickedItem={this.getClickedItem}/>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
                <button onClick={this.handleGlobalLock} className="button">{this.state.global}</button>
            </div>
        </div>
    );
  }

}

export default OutfitCreation;
