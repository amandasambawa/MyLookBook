import React, {Component} from 'react';
import {database} from '../firebase.js';
import Rate from 'rc-rate';
import "../styles/stars.css";
import "../styles/SingleOutfitView.css";
import AlertContainer from 'react-alert';

class SingleOutfitView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oufitImage: 0,
      compositionRating: 0,
      trendyRating: 0,
      ratings: []
    }
    this.loadRatings = this.loadRatings.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    //grab outfit image in database
    let compositionTotal = 0;
    let trendyTotal = 0;
    let averageUsers = 0;
    let ratingArray = [];
    let image = null;

    //grabbing the image from database
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`).once("value").then((snapshot) => {
      image = snapshot.child("img").val();
      this.setState({outfitImage: image});
    });

    //grabbing ratings from database
    database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`).once("value").then((snapshot) => {
      //iterating through each index of the database
      snapshot.forEach(function(childSnapshot) {
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
      this.setState({compositionRating: avgComposition, trendyRating: avgTrendy, ratings: ratingArray});
    });

  }

  //this method loads all the rating objects into a component.
  //this function is called at the bottom of render
  loadRatings() {
    return this.state.ratings.map((rating) => {
      return (
        <div>
          <div className="ratingsContainer">
            <div className="ratingsLabel">Composition</div>
            <Rate value={rating.composition} style={{
              fontSize: 30
            }} allowHalf/>
            <div className="ratingsLabel">Trendy</div>
            <Rate value={rating.trendy} style={{
              fontSize: 30
            }} allowHalf/>
            <div className='commentBox'>{rating.comment}</div>

          </div>
        </div>
      );
    })
  }

  handleFocus(event) {
    event.target.select();
  }

  copyToClipboard(){
    document.querySelector("#linkCopy").select();
    document.execCommand('copy');
    this.showAlert();
  }

  alertOptions = {
     offset: 14,
     position: 'top right',
     theme: 'dark',
     time: 5000,
     transition: 'scale'
   }

   showAlert = () => {
     this.msg.show('Copied to Clipboard!', {
       time: 2000,
       type: 'success',
       //icon: <img src="path/to/some/img/32x32.png" />
     })
   }

  render() {
    return (
      <div>
       <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div id="singleOutfitViewContainer">
          <div className="imageIDContainer">
            <img className="imageID" src={this.state.outfitImage}/>
          </div>
          <div id="linkContainer">
            <span id="linkTitle">Link:</span>
            <input id="linkCopy" className="link" type="text" onFocus={this.handleFocus} value={`rateView/${this.props.uid}/${this.props.match.params.outfitId}`}/>
            <button className="button" onClick={this.copyToClipboard}>Copy</button>
                <a id="fbShare" href="https://www.facebook.com/sharer.php?u=" title="Facebook share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}">fb</a>
                <a id="tShare" href="https://twitter.com/share?url=;text=Rate my Outfit" title="Twitter share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}">twitter</a>
                <a id="gpShare" href="https://plus.google.com/share?url=" title="Google Plus Share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}">gp</a>
            </div>

          <div className="ratingsContainer">
            <div className="ratingsLabel">Overall Composition</div>
            <Rate value={this.state.compositionRating} style={{
              fontSize: 30
            }} allowHalf/>

            <div className="ratingsLabel">Overall Trendy</div>
            <Rate value={this.state.trendyRating} style={{
              fontSize: 30
            }} allowHalf/>
          </div>
          <div className="ratingsLabel">Ratings and Comments</div>
          {this.loadRatings()}
        </div>
      </div>
    );
  }

}

export default SingleOutfitView;
