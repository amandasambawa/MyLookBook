import React, { Component } from 'react';
import { database, auth } from '../firebase.js';

class Feed extends Component {

  constructor(){
    super();
    this.state = {
    }
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

  render(){
    return(
      <div>
        <button onClick={this.logout} className="button">Logout</button>
        Feed
      </div>
    );
  }

}

export default Feed;
