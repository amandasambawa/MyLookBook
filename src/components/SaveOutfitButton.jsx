import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';
import {database} from '../firebase.js';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import html2canvas from 'html2canvas';
import '../styles/SaveOutfitButton.css';
import AlertContainer from 'react-alert';

class SaveOutfitButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfitKey: false
    }
    this.saveOutfit = this.saveOutfit.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'dark',
    //time: 1,
    transition: 'fade'
  }

  saveOutfit() {
    //console.log(this.props.itemCount);
    if (this.props.itemCount <= 0) {
      //console.log("need items for outfit!");
      this.msg.show("Can't save empty outfit!", {
        time: 20000,
        type: 'error'

      });
    } else {
      this.generateImage();
    }
  }

  generateImage() {
    html2canvas(document.getElementsByClassName('DropZoneContainer'), {
      //  allowTaint: true,
      logging: true,
      useCORS: true,
      onrendered: (canvas) => {
        //console.log('generating');

        var url = canvas.toDataURL("image/png");
        let outfitRef = database.ref(`/users/${this.props.uid}/outfitobjects`);
        let newOutfit = outfitRef.push();
        let titleRef = this.props.outfitTitle;
        if (titleRef === null || titleRef.trim().length === 0) {
          titleRef = "Title";
        }
        newOutfit.set({
          global: Boolean(this.props.global),
          title: titleRef,
          ratings: {},
          img: url
        });

        this.setState({outfitKey: newOutfit.key});
        //if this outfit is global, save it to the global database.
        if (this.props.global === true) {
          let globalRef = database.ref(`/global/outfitobjects/${this.state.outfitKey}`);
          globalRef.set({
            title: titleRef,
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

  render() {
    if (this.state.outfitKey) {
      return <Redirect to={{
        pathname: `/singleOutfit/${this.state.outfitKey}`
      }}/>
    } else {
      return (
        <div className="saveOutfitContainer">
          <div className="navLink" onClick={this.saveOutfit}>
              <img className="navIcon" id="saveCloudIcon" src="../assets/save-cloud.svg"/>
              {/* <div className="navLink middleNav">Save outfit</div> */}
              <button
                  className="navLink"
                  id="saveOutfitButton"
                  value="Save Outfit"
                  autoFocus
              >Save Outfit</button>
          </div>
          {/*<button className="button" onClick={this.saveOutfit}>
            Save Outfit
          </button> */}
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
        </div>

      );
    }
  }

}

export default SaveOutfitButton;
