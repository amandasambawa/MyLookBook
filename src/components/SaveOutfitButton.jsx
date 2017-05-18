import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import '../styles/SaveOutfitButton.css';

class SaveOutfitButton extends Component {

  constructor(props){
    super(props);
    this.saveOutfit = this.saveOutfit.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

  saveOutfit(){
    this.generateImage();
    // let outfitRef = database.ref(`/users/${this.props.uid}/outfitobjects`);
    // let newOutfit = outfitRef.push()
    // newOutfit.set({
    //   outfitimg: "someimg",
    //   path: "1235",
    //   title: "Test Outfit",
    //   ratings: {}
    // })
  }

  generateImage() {
    html2canvas(document.getElementsByClassName('DropZoneContainer'), {
      //  allowTaint: true,
      logging: true,
      useCORS: true,
      onrendered: function(canvas) {
        console.log('generating');

        var url = canvas.toDataURL("image/png");
        window.open(url, "_blank");
        //elm = document.body.appendChild(canvas);
        //elm.setAttribute('id', 'captureImg');
        console.log(canvas);
      }
    });
  }

  render(){
    return(
        <div>
            <div className="saveOutfitContainer">
                <button className="button" onClick={this.saveOutfit}>
                Save Outfit
                </button>
            </div>
            <Link to="/singleOutfit/-KkI2QGzORcXRcSoHT9j">singleOutfit Test</Link>
        </div>

    );
  }

}

export default SaveOutfitButton;
