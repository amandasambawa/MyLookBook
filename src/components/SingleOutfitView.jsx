import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rater from 'react-rater';
import Rating from 'react-rating';
import Rate from 'rc-rate';
import "../styles/stars.css"
import "../styles/SingleOutfitView.css"


class SingleOutfitView extends Component {


  constructor(props){
    super(props);
    this.state = {
        compositionRating: React.PropTypes.number,
        trendyRating: React.PropTypes.number
    }
    this.singleOutfitQuery = this.singleOutfitQuery.bind(this);
  }


  componentDidMount() {
    //grabbing from data base
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`)
    .once("value").then((snapshot)=> {
      let compositionTotal = 0;
      let trendyTotal = 0;
      let averageUsers = 0;
      snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot.toJSON());
        let composition = childSnapshot.child("composition").val();
        let trendy = childSnapshot.child("trendy").val();
        compositionTotal += composition;
        trendyTotal += trendy;
        averageUsers += 1;
      });
      //setting the states to be the average ratings
      let avgComposition = (compositionTotal / averageUsers);
      avgComposition = (Math.round(avgComposition * 100) / 100);
      let avgTrendy = (trendyTotal / averageUsers);
      avgTrendy = (Math.round(avgTrendy * 100) / 100);
      this.setState({compositionRating: avgComposition, trendyRating: avgTrendy } );
    });

  }

  singleOutfitQuery(){



 }

  //both the ratings of these things should be a state, but for now as an
  //example, it is random #s
  render(){
    console.log(this.state.compositionRating + " " + typeof(this.state.compositionRating));
    let please = this.state.compositionRating;
    console.log(please);
    return(
      <div>
        <h1>SingleOutfitView</h1>

        <h1>Image goes here</h1>

        <h2>Composition</h2>
        <Rate
            value={this.state.compositionRating}
            style={{ fontSize: 40 }}
            allowHalf
          />
        <h3> Composition Average Rating = {this.state.compositionRating} </h3>

        <h2>Trendy</h2>
        <Rate
            value={this.state.trendyRating}
            style={{ fontSize: 40 }}
            allowHalf
          />
        <h3> Trendy Average Rating = {this.state.trendyRating} </h3>

        <h2>Comment</h2>
        <div className="commentBox">Really pretty outfit!</div>

      </div>
    );
  }

}

export default SingleOutfitView;
