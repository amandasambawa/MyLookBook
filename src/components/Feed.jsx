import React, { Component } from 'react';
import { database, auth } from '../firebase.js';
import { Link } from 'react-router-dom';

class Feed extends Component {

  logout(){
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.
    }).catch(function(error) {
      console.log("error loggin out")
      // An error happened.
    });
  }

  render(){
    return(
      <div>
        <Link to="/outfitCreation" className="button">Create Outfit</Link>
      </div>
    );
  }

}

export default Feed;
