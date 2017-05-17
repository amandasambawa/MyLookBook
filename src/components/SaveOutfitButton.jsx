import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';
import { Link } from 'react-router-dom';


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
      <div>
        <button className="button" onClick={this.saveOutfit}>
          SaveOutfitButton
        </button>
        <Link to="/singleOutfit/-KkI2QGzORcXRcSoHT9j">singleOutfit Test</Link>
      </div>

    );
  }

}

export default SaveOutfitButton;
