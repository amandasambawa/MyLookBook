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
        ratings: []
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
      let ratingArray = [];
      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot){
        ratingArray.push(childSnapshot.val());
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
      this.setState({compositionRating: avgComposition, trendyRating: avgTrendy, ratings: ratingArray } );
    });

  }

  loadRatings() {
    return this.state.ratings.map((rating)=>{
        return (
          <div>
          <h2>Composition</h2>
          <Rate
              value={rating.composition}
              style={{ fontSize: 30 }}
              allowHalf
          />
          <h2>Trendy</h2>
          <Rate
              value={rating.trendy}
              style={{ fontSize: 30 }}
              allowHalf
            />
          <div className='commentBox'>{rating.comment}</div>
          
          </div>
        );
    })
  }

  render(){
    console.log(this.state.compositionRating + " " + typeof(this.state.compositionRating));
    let please = this.state.compositionRating;
    console.log(please);
    return(
      <div>
        <h1>SingleOutfitView</h1>

        <h1>Image goes here</h1>
        <div className="ratingsContainer">
            <h2>Composition</h2>
            <Rate
                value={this.state.compositionRating}
                style={{ fontSize: 30 }}
                allowHalf
            />
            <h3> Composition Average Rating = {this.state.compositionRating} </h3>

            <h2>Trendy</h2>
            <Rate
                value={this.state.trendyRating}
                style={{ fontSize: 30 }}
                allowHalf
            />
            <h3> Trendy Average Rating = {this.state.trendyRating} </h3>

            <h2>Ratings and Comments</h2>
                {this.loadRatings()}
        </div>
      </div>
    );
  }

}

export default SingleOutfitView;
