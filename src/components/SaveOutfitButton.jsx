import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import html2canvas from 'html2canvas';
import '../styles/SaveOutfitButton.css';

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
        let newOutfit = outfitRef.push();
        //  console.log(this.props.outfitTitle);
          newOutfit.set({
            global: Boolean(this.props.global),
            title: this.props.outfitTitle,
            ratings: {},
            img: url
          });

        this.setState({outfitKey: newOutfit.key});
        console.log("Save OutfitButton is " + this.props.global);
        console.log("props global is " + typeof(this.props.global));
        if(this.props.global === true){
          let globalRef = database.ref(`/global/outfitobjects/${this.state.outfitKey}`);
          globalRef.set({
            title: this.props.outfitTitle,
            global: Boolean(this.props.global),
            ratings: {},
            img: url,
            uid: this.props.uid,
            oid: this.state.outfitKey
          });

        }





      }
    });
  }

  render(){
    if(this.state.outfitKey){
      return <Redirect to={{ pathname: `/singleOutfit/${this.state.outfitKey}` }} />
    }else{
      return(
        <div className="saveOutfitContainer">
          <button className="button" onClick={this.saveOutfit}>
            Save Outfit
          </button>
        </div>

      );
    }
  }

}

export default SaveOutfitButton;
