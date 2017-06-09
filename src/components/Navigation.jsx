import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import OutfitCreation from './OutfitCreation.jsx';
import "../styles/Navigation.css";


const propsToHeader = {
  "login": "Login",
  "feed": "Closet",
  "outfitCreation": "Create An Outfit",
  "singleOutfit": "Outfit"
}

class Navigation extends Component {

  constructor(props){
    super(props);
    this.pageToHeader = this.pageToHeader.bind(this);
    this.backToFeed = this.backToFeed.bind(this);
    this.createOrSaveOutfit = this.createOrSaveOutfit.bind(this);
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
                  <img className="navIcon" src="../../assets/shirt.svg" />
                  <button
                      className="navLink"
                      value="My Lookbook"

                  >My Lookbook</button>
              </Link>
          </div>);
  }

  backToGlobalFeed(){
      return (
          <div className="globalFeedLink">
              <Link to="/globalFeed">
                  <img className="navIcon" src="../../assets/earth-globe.svg" />
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
        return <SaveOutfitButton uid={this.props.uid} outfitTitle={this.props.title}
        global={this.props.global} clickedItems={this.props.clickedItems} itemCount={this.props.itemCount}/>
    }else{
      //anywhere else and the user will be prompted to make an outfit
        return (
            <div className="createOutfitLink">
                <Link to="/outfitCreation">
                    <img className="navIcon" src="../../assets/plus-button.svg" />
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
    if( this.props.location.pathname.split("/")[1] === "outfitCreation"
      && this.props.render === undefined ) {
      return(<div></div>);
    }else if(this.props.uid){
      return(
          <div>
            <div className="row" id="navBar">
              <div className="small-5 columns ">
                  {this.backToFeed()}
              </div>
              <div className="small-6 columns">
                    {this.createOrSaveOutfit()}
              </div>
              <div className="small-5 columns">
                    {this.backToGlobalFeed()}
              </div>
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
