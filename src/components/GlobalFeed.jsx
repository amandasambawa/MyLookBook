import React, {Component} from 'react';
import {database, auth} from '../firebase.js';
import {Link} from 'react-router-dom';
import Logout from './Logout.jsx'
import "../styles/foundation.css";
import "../styles/GlobalFeed.css";

class GlobalFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previews: [],
      exists: false
    }
    this.loadingContent = this.loadingContent.bind(this);
  }

  componentDidMount() {
    let previewArray = [];
    //the line below references the database at the folder where the
    //outfits exist
    database.ref(`/global/outfitobjects/`).once("value").then((snapshot) => {
      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot, key) {
        previewArray.push(childSnapshot);
      });
      previewArray.reverse();
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
    }else{
      return this.state.previews.map((preview) => {
      return (
        <div>
            <span className="outfitName2">{preview.val().title}</span>
            <Link to={`publicOutfit/${preview.val().oid}`}><img className="imageID"  src={preview.val().img}/></Link>
        </div>
        );
      });
    }
  }

  render() {
    return (
        <div>
            <Logout />
            <div className="feedContainer">
            <h2 id="feedTitle">Feed</h2>
            {this.loadingContent()}
        </div>
        </div>
    );
  }

}

export default GlobalFeed;
