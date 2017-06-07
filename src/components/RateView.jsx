import React, { Component } from 'react';
import { database } from '../firebase.js';
import { Redirect } from 'react-router-dom';
import Rate from 'rc-rate';
import "../styles/stars.css";
import "../styles/RateView.css";
import Confirmation from './Confirmation.jsx';
import NotificationSystem from 'react-notification-system';

class RateView extends Component {

  constructor(props){
    super(props);
    this.state = {
      ratingComposition: 0,
      ratingTrendy: 0,
      ratingComment: "",
      outfitImage: true,
      haveSaved: false,
      sender: "",
      global: ""
    }
      this.handleComposition = this.handleComposition.bind(this);
      this.handleTrendy = this.handleTrendy.bind(this);
      this.saveRating = this.saveRating.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
  }


  componentDidMount() {
    //grab outfit image in database
    if(this.props.testing === true ) {

    } else {
      let image = null;
      database.ref(`/users/${this.props.match.params.userId}/outfitobjects/${this.props.match.params.outfitId}`)
      .once("value").then((snapshot)=> {
          image = snapshot.child("img").val();
          this.setState({ outfitImage: image , global: snapshot.child("global").val() });
      });

        database.ref(`/users/${this.props.match.params.userId}`)
            .once("value").then((snapshot)=> {
            this.setState({ sender: snapshot.child("username").val() });
        });
    }
  }

  //handles the composition rating
  handleComposition(rating) {
    if(this.state.haveSaved === false){
      this.setState({
        ratingComposition: rating
      })
    }
  }

  //handles the trendy rating
  handleTrendy(rating) {
    if(this.state.haveSaved === false){
      this.setState({
        ratingTrendy: rating
      })
    }
  }

  //handles the comment state.
  handleCommentChange(event){
      this.setState({ratingComment: event.target.value});
  }


  //handles saving the rating and comments
  saveRating() {
    //if the user has not saved once before, we will send that data to the db
    if(this.state.haveSaved === false){

        let ratingRef = database.ref(`/users/${this.props.match.params.userId}/outfitobjects/${this.props.match.params.outfitId}/ratings/`);
        let newRating = ratingRef.push();

        newRating.set({
          comment: this.state.ratingComment,
          composition: this.state.ratingComposition,
          trendy: this.state.ratingTrendy
        })

        //if this outfit has a global state, we also write the the global outfit database
        if(this.state.global){
          let globalRef = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}/ratings/`);
          let globalRating = globalRef.push();
          globalRating.set({
            comment: this.state.ratingComment,
            composition: this.state.ratingComposition,
            trendy: this.state.ratingTrendy
          })
        }

        this.setState({haveSaved: true});
    } else {
      //the user has already pressed save, give them alert denying the option
      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `You have already rated this image!!`,
        level: 'error'
    });

    }
  }


  render(){
    if(this.state.haveSaved === true){
      return <Confirmation />
    } else {

    if ( this.props.uid === this.props.match.params.userId || this.state.outfitImage === null ){
      return <Redirect to={{ pathname: `/singleOutfit/${this.props.match.params.outfitId}` }} />
    }else{
      return(
        <div id="rateViewContainer">
            <div id="rateTitle"><span id="senderName">{this.state.sender}</span> would like you to rate this outfit!</div>
          <div className ="imageIDContainer">
            <img className="imageID" src={this.state.outfitImage}/>
          </div>

          <div className="ratingsLabel">Composition</div>
          <Rate
             defaultValue={0}
             onChange={this.handleComposition}
             style={{ fontSize: 40 }}
           />

          <div className="ratingsLabel">Trendy</div>
          <Rate
              defaultValue={0}
              onChange={this.handleTrendy}
              style={{ fontSize: 40 }}
            />

          <div className="ratingsLabel">Comment</div>
          <textarea className="commentBox" placeholder="Leave a comment!" onChange={this.handleCommentChange}></textarea>

          <NotificationSystem ref="notificationSystem" />
          <button onClick={this.saveRating} className="button" style= {{ marginBottom: "4em" }}>Save</button>

        </div>
      );
    }

  }
  }

}

export default RateView;
