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
      exists: false

    }
    this.loadingContent = this.loadingContent.bind(this);
  }

  logout() {
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.

    }).catch(function(error) {
      console.log("error loggin out")
      // An error happened.
      return false;
    });
    return true;
  }

  componentDidMount() {
    let previewArray = [];
    let counterTemp = 0;
    database.ref(`/users/${this.props.uid}/outfitobjects/`).once("value").then((snapshot) => {
      //iterating through each index of the database
      console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot, key) {
        //console.log("key is " , key);
        //console.log("childsnapshot + key",childSnapshot.key);
        //console.log(childSnapshot.val());
        previewArray.push(childSnapshot);
      });
      this.setState({previews: previewArray, exists: snapshot.val()});
    });
  }


  loadingContent(){
    if(this.state.exists === false){
      return <img id="loadingImg" src="http://apdw.com/images/balls_loading.gif?x13037"/>;

        //this.setState({loadImg : true});

    }else if(this.state.exists === null){
      return <div>CREATE AN OUTFIT BELOW</div>;
        //this.setState({loadImg : false});
    }else{
      return this.state.previews.map((preview) => {
      return (
        <div className="small-8 medium-4 large-4 columns">
        <span className="outfitName2">{preview.val().title}</span>
        <Link to={`/singleOutfit/${preview.key}`}><img src={preview.val().img}/></Link>
        </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="buttonContainer">
          <Link to="/outfitCreation" id='createOutfitButton' className="button">Create Outfit</Link>
        </div>
        {this.loadingContent()}

      </div>
    );
  }

}

export default Feed;
