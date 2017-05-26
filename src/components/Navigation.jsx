import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { auth } from '../firebase.js';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import OutfitCreation from './OutfitCreation.jsx';
import "../styles/Navigation.css";


const propsToHeader = {
  "login": "Login",
  "feed": "Closet",
  "outfitCreation": "Create An Outfit",
  "singleOutfit": "Outfit",
  "rateView": "Rate this Outfit"
}

class Navigation extends Component {

  constructor(props){
    super(props);
    this.pageToHeader = this.pageToHeader.bind(this);
    this.backToFeed = this.backToFeed.bind(this);
    this.createOrSaveOutfit = this.createOrSaveOutfit.bind(this);
  }

  logout(){
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.
    }).catch(function(error) {
      console.log("error loggin out")
      // An error happened.
    });
  }

  pageToHeader(){
    //console.log(propsToHeader[this.props.location.pathname.split("/")[1]);
    if ( propsToHeader[this.props.location.pathname.split("/")[1]] === "Closet"){
      return  this.props.userName + "'s " + propsToHeader[this.props.location.pathname.split("/")[1]];
    }else{
      return propsToHeader[this.props.location.pathname.split("/")[1]];
    }
  }

  backToFeed(){
      return <div className="feedLink"><Link to="/feed">Closet</Link></div>;
  }

  backToGlobalFeed(){
      return <div className="globalFeedLink"><Link to="/globalFeed">GlobalFeed</Link></div>;
  }

  createOrSaveOutfit(){
    //if we are in create outfit, the middle button should be saving the outfit
    if ( this.props.location.pathname.split("/")[1] === "outfitCreation"){
        return <SaveOutfitButton uid={this.props.uid} outfitTitle={this.props.title} global={this.props.global} />
    }else{
      //anywhere else and the user will be prompted to make an outfit
        return <div className="createOutfitLink"><Link to="/outfitCreation">Create An Outfit</Link></div>;
    }

  }


  render(){
    if(this.props.uid){
      return(
            <div className="mobile-nav-bar title-bar">
              <div className="title-bar-left">
              <div className="title-bar-right">
                  {this.backToGlobalFeed()}
              </div>
                <span className="title-bar-text" onClick={this.logout}>Logout</span>
              </div>
              <div className="title-bar-center">
                    {this.createOrSaveOutfit()}
              </div>
              <div className="title-bar-right">
                  {this.backToFeed()}
              </div>
            </div>
      );
    }else{
      return(
          <div className="mobile-nav-bar title-bar">
            <div className="title-bar-left">
            </div>
            <div className="title-bar-center">
              <span className="title-bar-text">{this.pageToHeader()}</span>
            </div>
            <div className="title-bar-right">
            </div>
          </div>
      );
    }
  }
}


export default withRouter(Navigation);
