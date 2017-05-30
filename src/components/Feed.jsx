import React, {Component} from 'react';
import {database, auth} from '../firebase.js';
import {Link} from 'react-router-dom';
import "../styles/foundation.css";
import "../styles/Feed.css";

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previews: [],
      exists: false,
      title: "   "

    }
    this.loadingContent = this.loadingContent.bind(this);
  }

  /*
  * A simple logout function that returns True if action was successful
  * and returns false if action was unsuccessful.
  */
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

  componentDidMount() {
    let previewArray = [];
    //the line below references the database at the folder where the
    //outfits exist
    database.ref(`/users/${this.props.uid}/outfitobjects/`).once("value").then((snapshot) => {
      //iterating through each index of the database
      console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot, key) {
        previewArray.push(childSnapshot);
      });
      this.setState({previews: previewArray, exists: snapshot.val()});
    });
  }

  /*loadingContent is a method that uses the state "exists" to determine
  *which screen the user sees. The options are: a loading screen,
  *a call to action which prompts the user to create an outfit.
  *or the entire closet.
  */
  loadingContent(){
    //if state exists is false, we show a loading screen.
    if(this.state.exists === false){
      return <img id="loadingImg" src="http://apdw.com/images/balls_loading.gif?x13037"/>;
    //if state exists is null, we will prompt the user to create an outfit
    }else if(this.state.exists === null){
      return (
          <div id="feedContainer">
              <h1>Start by creating outfits here</h1>
              <img src="../assets/curve-down-arrow.png" />
          </div>
      );
      //we will default load the rest of the items in the closet.
    }else{
      return this.state.previews.map((preview) => {
      return (
        <div className="small-8 medium-4 large-4 columns">
            <span className="outfitName2">{preview.val().title}</span>
            <Link to={`/singleOutfit/${preview.key}`}><img className="outfitLink"  src={preview.val().img}/></Link>
        </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="row">
        {this.loadingContent()}
      </div>
    );
  }

}

export default Feed;
