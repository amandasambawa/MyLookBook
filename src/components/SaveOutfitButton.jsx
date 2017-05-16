import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';


class SaveOutfitButton extends Component {

  constructor(props){
    super(props);
    this.saveOutfit = this.saveOutfit.bind(this);
  }

  saveOutfit(){
    let outfitRef = database.ref(`/users/${this.props.uid}/outfitobjects`);
    let newOutfit = outfitRef.push()
    newOutfit.set({
      outfitimg: "someimg",
      path: "1235",
      title: "Test Outfit",
      ratings: {}
    })
  }

  render(){
    return(
      <button className="button" onClick={this.saveOutfit}>
        SaveOutfitButton
      </button>
    );
  }

}

export default SaveOutfitButton;
