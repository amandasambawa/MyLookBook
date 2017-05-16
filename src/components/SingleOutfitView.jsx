import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rater from 'react-rater';

class SingleOutfitView extends Component {

  constructor(props){
    super(props);
    this.state = {
        compositionRating: 0,
        trendyRating: 0
    }
  }


  //both the ratings of these things should be a state, but for now as an
  //example, it is random #s
  render(){
    return(
      <div>
        <h1>SingleOutfitView</h1>

        <h1>Image goes here</h1>

        <h2>Composition</h2>
        <Rater interactive={false} rating={4.5} />

        <h2>Trendy</h2>
        <Rater interactive={false} rating={3.4}  />

        <h2>Comment</h2>
        <textarea>Really pretty outfit!</textarea>


      </div>
    );
  }

}

export default SingleOutfitView;
