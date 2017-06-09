import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';
import {database} from '../firebase.js';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import html2canvas from 'html2canvas';
import '../styles/SaveOutfitButton.css';
import NotificationSystem from 'react-notification-system';

class SaveOutfitButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfitKey: false,
      username: null
    }
    this.saveOutfit = this.saveOutfit.bind(this);
    this.generateImage = this.generateImage.bind(this);
  }

  componentDidMount(){
    let usernameRef = database.ref(`/users/${this.props.uid}/username`);
    usernameRef.once("value").then((snapshot)=>{
      this.setState({username: snapshot.val()});
    });
  }

  saveOutfit() {
    //console.log(this.props);
    if (this.props.itemCount <= 0) {

      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `Can't save an empty outfit!`,
        level: 'error'
    });
    } else {
      //console.log("here: ",this.props.clickedItems);
      this.generateImage();
    }
  }

  generateImage() {
    html2canvas(document.getElementsByClassName('DropZoneContainer'), {
      //  allowTaint: true,
      logging: false,
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
          img: url,
          items:this.props.clickedItems
        });

        this.setState({outfitKey: newOutfit.key});
        //if this outfit is global, save it to the global database.
        if (this.props.global === true) {
          let globalRef = database.ref(`/global/outfitobjects/${this.state.outfitKey}`);
          console.log(this.state.username);
          globalRef.set({
            title: titleRef,
            global: Boolean(this.props.global),
            ratings: {},
            img: url,
            uid: this.props.uid,
            oid: this.state.outfitKey,
            items: this.props.clickedItems,
            username:this.state.username
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
              >Save Outfit</button>
          </div>
          {/*<button className="button" onClick={this.saveOutfit}>
            Save Outfit
          </button> */}
          <NotificationSystem ref="notificationSystem" />
        </div>

      );
    }
  }

}

export default SaveOutfitButton;
