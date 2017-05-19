import React, { Component } from 'react';
import { database, auth } from '../firebase.js';
import { Link } from 'react-router-dom';
import "../styles/foundation.css";
import "../styles/Feed.css";

class Feed extends Component {

  constructor(props){
    super(props);
    this.state = {
      previews: []
    }
    this.loadOutfits = this.loadOutfits.bind(this);
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

  componentDidMount() {
    let previewArray = [];
    database.ref(`/users/${this.props.uid}/outfitobjects/`)
    .once("value").then((snapshot)=> {
      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot,key){
        //console.log("key is " , key);
        //console.log("childsnapshot + key",childSnapshot.key);
        //console.log(childSnapshot.val());
        previewArray.push(childSnapshot);
      });
      this.setState( {previews:previewArray} );
    });
  }

  loadOutfits() {
    var arr = [];
    let ctr = this.state.previews.length-1;

    while (ctr > 1)
    {
        arr.push(
            <div className="row">
                <div className="large-6 columns">
                    <span className="outfitName2">Outfit Name 1</span>
                    <Link to={`/singleOutfit/${this.state.previews[ctr].key}`} ><img src={this.state.previews[ctr].val().img}/></Link>
                </div>
                <div className="large-6 columns">
                    <span className="outfitName2">Outfit Name 2</span>
                    <Link to={`/singleOutfit/${this.state.previews[ctr - 1].key}`}><img src={this.state.previews[ctr - 1].val().img}/></Link>
                </div>
            </div>
        )
        ctr=ctr-2;
    }
    if (ctr === 1) {
        arr.push(
            <div className="row">
                <div className="large-6 columns">
                    <span className="outfitName2">Outfit Name 1</span>
                    <Link to={`/singleOutfit/${this.state.previews[ctr].key}`} ><img src={this.state.previews[ctr].val().img}/></Link>
                </div>
                <div className="large-6 columns">
                </div>
            </div>
        )
    }

      return arr;
  }

  render(){
    return(
      <div>
        <Link to="/outfitCreation" id='createOutfitButton' className="button">Create Outfit</Link>
        {this.loadOutfits()}

      </div>
    );
  }

}

export default Feed;
