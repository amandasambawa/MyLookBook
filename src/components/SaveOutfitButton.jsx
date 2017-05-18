import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import html2canvas from 'html2canvas';

class SaveOutfitButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      outfitKey: false
    }
    this.saveOutfit = this.saveOutfit.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

  saveOutfit(){
    this.generateImage();
  }

  generateImage() {
    html2canvas(document.getElementsByClassName('DropZoneContainer'), {
      //  allowTaint: true,
      logging: true,
      useCORS: true,
      onrendered: (canvas) => {
        console.log('generating');

        var url = canvas.toDataURL("image/png");
        let outfitRef = database.ref(`/users/${this.props.uid}/outfitobjects`);
        let newOutfit = outfitRef.push()
        newOutfit.set({
          outfitimg: "someimg",
          path: "1235",
          title: "Test Outfit",
          ratings: {},
          img: url
        });
        this.setState({outfitKey: newOutfit.key});
      }
    });
  }

  render(){
    if(this.state.outfitKey){
      return <Redirect to={{ pathname: `/singleOutfit/${this.state.outfitKey}` }} />
    }else{
      return(
        <div>
          <button className="button" onClick={this.saveOutfit}>
            Save Outfit
          </button>
        </div>

      );
    }

  }

}

export default SaveOutfitButton;
