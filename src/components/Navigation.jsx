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
    if(this.props.uid){
      return(
            <div className="mobile-nav-bar title-bar">
              <div className="title-bar-left">
                {this.conditionalBackToFeed()}
              </div>
              <div className="title-bar-center">
                <span className="title-bar-text">{this.pageToHeader()}</span>
              </div>
              <div className="title-bar-right">
                <span className="title-bar-text" onClick={this.logout}>Logout</span>
              </div>
            </div>
      );
    }else{
      return(
          <div></div>
      );
    }
  }
}

// if (this.props.uid){
//   console.log(this.props);
//   return (
//     <div className="navigation">
//
//         <div>{this.pageToHeader()}</div>
//         <button className="button" onClick={this.logout}>Logout</button>
//     </div>);
// }else{
//
// }


export default withRouter(Navigation);
