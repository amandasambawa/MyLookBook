import React, { Component } from 'react';
import {auth} from '../firebase.js';

class Logout extends Component {


  //This is the logout method, checks if there is a user logged in and logs out
  //if they are logged in, else do nothing
  logout() {
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.

    }).catch(function(error) {
      console.log("error logging out")
      // An error happened.
      return false;
    });
    return true;
  }


  render(){
    return(
      <div id="logoutContainer" onClick={this.logout}><img className="navIcon" src="../assets/logout.svg"/></div>
    );
  }

}

export default Logout;
