import React, { Component } from 'react';
import { database } from '../firebase.js';
import Rate from 'rc-rate';
import "../styles/stars.css";
import "../styles/SingleOutfitView.css";


class SingleOutfitView extends Component {


  constructor(props){
    super(props);
    this.state = {
        oufitImage: 0,
        compositionRating: 0,
        trendyRating: 0,
        ratings: []
    }
    this.loadRatings = this.loadRatings.bind(this);
  }


  componentDidMount() {
    //grab outfit image in database
    let compositionTotal = 0;
    let trendyTotal = 0;
    let averageUsers = 0;
    let ratingArray = [];
    let image = null;
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`)
    .once("value").then((snapshot)=> {
        image = snapshot.child("img").val();
        this.setState({ outfitImage: image });
    });



    //grabbing ratings from data base
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`)
    .once("value").then((snapshot)=> {
      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot){
        //add a Rating object to ratingArray
        ratingArray.push(childSnapshot.val());
        //getting the total values of composition and trendy
        let composition = childSnapshot.child("composition").val();
        let trendy = childSnapshot.child("trendy").val();
        compositionTotal += composition;
        trendyTotal += trendy;
        averageUsers += 1;
      });

      //setting the states to be the average ratings
      let avgComposition = (compositionTotal / averageUsers);
      let avgTrendy = (trendyTotal / averageUsers);
      avgComposition = (Math.round(avgComposition * 2) / 2).toFixed(1);
      avgTrendy = (Math.round(avgTrendy * 2) / 2).toFixed(1);
      avgComposition = parseFloat(avgComposition);
      avgTrendy = parseFloat(avgTrendy);


      //setting the state to be average ratings
      this.setState({compositionRating: avgComposition, trendyRating: avgTrendy, ratings: ratingArray} );
    });

  }

  //this method loads all the rating objects into a component.
  //this function is called at the bottom of render
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
    return(
      <div>
        <h1>SingleOutfitView</h1>
        <img className="imageID" src={this.state.outfitImage}/>

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
