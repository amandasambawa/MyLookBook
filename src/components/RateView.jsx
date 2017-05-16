import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rater from 'react-rater';

class RateView extends Component {

  constructor(props){
    super(props);
    this.state = {
      rating: 0
    }
      this.handleRate = this.handleRate.bind(this);
  }

  handleRate({ rating, type }) {
    this.setState({
      rating: rating
    })
    if (type === 'click') {
      console.log('You rated ' + rating)
    }
  }

  render(){
    return(
      <div>
        RateView
        <Rater total={5} rating={this.state.rating} onRate={this.handleRate} interactive={true} />
      </div>
    );
  }

}

export default RateView;
