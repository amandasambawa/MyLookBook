import React, { Component } from 'react';
import { database, auth } from '../firebase.js';
import { Link } from 'react-router-dom';

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
    return this.state.previews.map((preview)=>{
        return (
          <div>
            <Link to={`/singleOutfit/${preview.key}`} ><img src={preview.val().img}/></Link>
          </div>
        );
    })
  }

  render(){
    return(
      <div>
        {this.loadOutfits()}
        <Link to="/outfitCreation" className="button">Create Outfit</Link>
      </div>
    );
  }

}

export default Feed;
