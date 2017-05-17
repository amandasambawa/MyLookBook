import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { auth } from '../firebase.js';
import "../styles/Navigation.css";


const propsToHeader = {
  "login": "Login",
  "feed": "Feed",
  "outfitCreation": "Create An Outfit",
  'singleOutfit': "Outfit",
  "rateView": "Rate this Outfit"
}

class Navigation extends Component {

  constructor(props){
    super(props);
    this.pageToHeader = this.pageToHeader.bind(this);
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
    return propsToHeader[this.props.location.pathname.split("/")[1]];
  }

  conditionalBackToFeed(){
    if (this.props.location.pathname === "/feed"){
      return <div></div>;
    }else{
      return <div><Link to="/feed">Feed</Link></div>;
    }
  }

  render(){

    if (this.props.uid){
      console.log(this.props);
      return (
        <div className="navigation">
            {this.conditionalBackToFeed()}
            <div>{this.pageToHeader()}</div>
            <button className="button" onClick={this.logout}>Logout</button>
        </div>);
    }else{
      return(
        <div></div>
      );
    }
  }
}


export default withRouter(Navigation);
