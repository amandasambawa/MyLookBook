import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rater from 'react-rater';

class RateView extends Component {

  constructor(props){
    super(props);
    this.state = {
      ratingComposition: 0,
      ratingTrendy: 0
    }
      this.handleComposition = this.handleComposition.bind(this);
      this.handleTrendy = this.handleTrendy.bind(this);
      this.saveRating = this.saveRating.bind(this);
  }

  handleComposition({ rating, type }) {
    this.setState({
      ratingComposition: rating
    })
    if (type === 'click') {
      console.log('You rated Composition as ' + rating)
    }
  }

  handleTrendy({ rating, type }) {
    this.setState({
      ratingTrendy: rating
    })
    if (type === 'click') {
      console.log('You rated Trendy as ' + rating)
    }
  }

  saveRating() {
    console.log("WHAT DO YOU WANT FROM ME");

  }
  render(){
    return(
      <div>
        <h1>RateView</h1>

        <h1>Image goes here</h1>

        <h2>Composition</h2>
        <Rater total={5} rating={this.state.rating} onRate={this.handleComposition} interactive={true} />

        <h2>Trendy</h2>
        <Rater total={5} rating={this.state.rating} onRate={this.handleTrendy} interactive={true} />

        <h2>Comment</h2>
        <textarea placeholder="Leave a comment!"></textarea>

        <button onClick={this.saveRating} className="button">Save</button>

      </div>
    );
  }

}

export default RateView;
