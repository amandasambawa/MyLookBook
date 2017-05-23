import React, { Component } from 'react';
import { database } from '../firebase.js';
import { Redirect } from 'react-router-dom';
import Rate from 'rc-rate';
import "../styles/stars.css";
import AlertContainer from 'react-alert';
import "../styles/RateView.css"

class RateView extends Component {

  constructor(props){
    super(props);
    this.state = {
      ratingComposition: 0,
      ratingTrendy: 0,
      ratingComment: "",
      haveSaved: false
    }
      this.handleComposition = this.handleComposition.bind(this);
      this.handleTrendy = this.handleTrendy.bind(this);
      this.saveRating = this.saveRating.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }


  componentDidMount() {
    //grab outfit image in database
    let image = null;
    database.ref(`/users/${this.props.match.params.userId}/outfitobjects/${this.props.match.params.outfitId}`)
    .once("value").then((snapshot)=> {
        image = snapshot.child("img").val();
        this.setState({ outfitImage: image });
    });
  }


  //the alert options for the npm react-alert
  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
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

  //handles the username state.
  handleUsernameChange(event){
      this.setState({ratingComment: event.target.value});
  }
  //handles saving the rating and comments
  saveRating() {
    //if the user has not saved once before, we will send that data to the db
    console.log(this.props.match.params);
    if(this.state.haveSaved === false){
        let ratingRef = database.ref(`/users/${this.props.match.params.userId}/outfitobjects/${this.props.match.params.outfitId}/ratings/`);
        let newRating = ratingRef.push();

        newRating.set({
          comment: this.state.ratingComment,
          composition: this.state.ratingComposition,
          trendy: this.state.ratingTrendy
        })

        this.setState({haveSaved: true});
    } else {
      //the user has already pressed save, give them alert denying the option
      this.msg.show('You have already rated this image!', {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale',
        type: null
      })

    }
  }


  render(){
    if (this.props.uid){
      return <Redirect to={{ pathname: `/singleOutfit/${this.props.match.params.outfitId}` }} />
    }else{
      return(
        <div id="rateViewContainer">

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
          <textarea placeholder="Leave a comment!" onChange={this.handleUsernameChange}></textarea>

          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <button onClick={this.saveRating} className="button">Save</button>

        </div>
      );
    }

  }

}

export default RateView;
