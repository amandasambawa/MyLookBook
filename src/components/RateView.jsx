import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rater from 'react-rater';

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

  //handles the composition rating
  handleComposition({ rating, type }) {
    if(this.state.haveSaved === false){
      this.setState({
        ratingComposition: rating
      })
      if (type === 'click') {
        console.log('You rated Composition as ' + rating);
      }
    }else{
      console.log('You have already voted');
    }
  }

  //handles the trendy rating
  handleTrendy({ rating, type }) {
    if(this.state.haveSaved === false){
      this.setState({
        ratingTrendy: rating
      })
      if (type === 'click') {
        console.log('You rated Trendy as ' + rating);
      }
    }else{
      console.log('You have already voted!');
    }
  }

  handleUsernameChange(event){
      this.setState({ratingComment: event.target.value});
  }
  //handles saving the rating and comments
  saveRating() {
    if(this.state.haveSaved === false){
        let ratingRef = database.ref(`/users/${this.props.uid}/outfitobjects/ratings/`);
        let newRating = ratingRef.push();
        
        newRating.set({
          comment: this.state.ratingComment,
          composition: this.state.ratingComposition,
          trendy: this.state.ratingTrendy
        })

        this.setState({haveSaved: true});
    } else {
      console.log("I AM TRUE");
    }
  }


  render(){
    return(
      <div>
        <h1>RateView</h1>

        <h1>Image goes here</h1>

        <h2>Composition</h2>
        <Rater total={5} onRate={this.handleComposition} interactive={true} />

        <h2>Trendy</h2>
        <Rater total={5} onRate={this.handleTrendy} interactive={true} />

        <h2>Comment</h2>
        <textarea placeholder="Leave a comment!" onChange={this.handleUsernameChange}></textarea>

        <button onClick={this.saveRating} className="button">Save</button>

      </div>
    );
  }

}

export default RateView;
