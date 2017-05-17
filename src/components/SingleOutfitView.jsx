import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rate from 'rc-rate';
import "../styles/stars.css"
import "../styles/SingleOutfitView.css"


class SingleOutfitView extends Component {


  constructor(props){
    super(props);
    this.state = {
        compositionRating: React.PropTypes.number,
        trendyRating: React.PropTypes.number,
        ratings: null
    }
    this.loadRatings = this.loadRatings.bind(this);
  }


  componentDidMount() {
    //grabbing from data base
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`)
    .once("value").then((snapshot)=> {
      let compositionTotal = 0;
      let trendyTotal = 0;
      let averageUsers = 0;

      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot){

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

  loadRatings() {

  }

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

        <h2>Ratings and Comments</h2>
          {this.loadRatings()}
      </div>
    );
  }

}

export default SingleOutfitView;
