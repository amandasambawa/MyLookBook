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

/*    componentDidMount() {
        this.refs.theDiv.focus();
    }
*/



  backToFeed(){
      return (
          <div className="feedLink">
              <Link to="/feed">
                  <div className="backgroundImage"></div>
                  <img className="navIcon" src="../assets/shirt.svg" />
                  {/* <div ref = "theDiv" className="navLink">My Lookbook</div> */}
                  <button
                      className="navLink"
                      value="My Lookbook"
                      autoFocus
                  >My Lookbook</button>
              </Link>
          </div>);
  }

  backToGlobalFeed(){
      return (
          <div className="globalFeedLink">
              <Link to="/globalFeed">
                  <img className="navIcon" src="../assets/earth-globe.svg" />
                  {/*<div className="navLink">Global Feed</div> */}
                  <button
                      className="navLink"
                      value="Global Feed"
                  >Global Feed</button>
              </Link>
          </div>
      );
  }

  createOrSaveOutfit(){
    //if we are in create outfit, the middle button should be saving the outfit
    if ( this.props.location.pathname.split("/")[1] === "outfitCreation"){
        return <SaveOutfitButton uid={this.props.uid} outfitTitle={this.props.title} global={this.props.global} itemCount={this.props.itemCount} clickedItems={this.props.clickedItems} />
    }else{
      //anywhere else and the user will be prompted to make an outfit
        return (
            <div>
                <Link to="/outfitCreation">
                    <img className="navIcon" src="../assets/plus-button.svg" />
                    {/*<div className="navLink">Create An Outfit</div> */}
                    <button
                        className="navLink"
                        value="Create an Outfit"
                    >Create an Outfit</button>
                </Link>
            </div>
        );
    }

  }

  render(){
    if( this.props.location.pathname.split("/")[1] === "outfitCreation" && this.props.render === undefined){
      return(<div></div>);
    }else if(this.props.uid){
      return(
          <div>
            <div className="row" id="navBar">
                <div className="small-5 columns">
                    {this.backToFeed()}
                </div>
              <div className="small-6 columns">
                    {this.createOrSaveOutfit()}
              </div>
                <div className="small-5 columns">
                        {this.backToGlobalFeed()}
                </div>
                {/*
                    <div className="small-4 columns">
                        <span onClick={this.logout}><img className="navIcon" src="../assets/logout.svg"/><div
                            className="navLink">Logout</div></span>
                    </div>
                */}
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
