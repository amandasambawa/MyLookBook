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
      ratings: [],
      uid: ""
    }
    this.loadRatings = this.loadRatings.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.injectRatingsContent = this.injectRatingsContent.bind(this);
  }

  componentDidMount() {
    //grab outfit image in database
    let compositionTotal = 0;
    let trendyTotal = 0;
    let averageUsers = 0;
    let ratingArray = [];
    let image = null;

    console.log(this.props.location.pathname);


    //initializing the database variables
    let dataBaseIMG = "";
    let dataBaseRating = "";
    //Singleoutview database
    if(this.props.location.pathname.charAt(1) === 's'){
          dataBaseIMG = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`);
          dataBaseRating = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`);
    }else{
    //publicview database
          dataBaseIMG = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}`);
          dataBaseRating = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}/ratings/`);

    }
    //grabbing the image from database

    dataBaseIMG.once("value").then((snapshot) => {
      image = snapshot.child("img").val();
      let uid = snapshot.child("uid").val();
      if (this.props.uid){
        this.setState({outfitImage: image, uid: this.props.uid});
      }else{
        this.setState({outfitImage: image, uid: uid});
      }

    });


    dataBaseRating.once("value").then((snapshot) => {
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

  injectRatingsContent(){
    //check if ratings is empty
    var ratingsContent;
    console.log("currently injecting");
    if(this.state.ratings.length===0){
      console.log("ratings are empty");
      ratingsContent = <div id="noRatingsPlaceholder">

      <h1 id="noRatingsHeader"> No ratings yet </h1>
      <div> Share the link with your friends and get instant feedback on your outfits!</div>


      </div>;
    } else {

      ratingsContent =  (<div> <div className="ratingsContainer">

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

            );

    }

    return ratingsContent;
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
    console.log(this.props);
    return (
      <div>
       <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div id="singleOutfitViewContainer">
          <div className="imageIDContainer">
            <img className="imageID" src={this.state.outfitImage}/>
          </div>
          <div id="linkContainer">
            <span id="linkTitle">Link:</span>

            <input id="linkCopy" className="link" type="text" onFocus={this.handleFocus} value={`rateView/${this.state.uid}/${this.props.match.params.outfitId}`}/>
                <div id="shareLinkButtons">
                    <button className="button" id="copyButton" onClick={this.copyToClipboard}>Copy</button>
                    <a className="socialMediaIcon" id="fbShare" href="https://www.facebook.com/sharer.php?u=" title="Facebook share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img src="../assets/facebook.png" /></a>
                    <a className="socialMediaIcon" id="tShare" href="https://twitter.com/share?url=;text=Rate my Outfit" title="Twitter share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img src="../assets/twitter.png" /></a>
                    <a className="socialMediaIcon" id="gpShare" href="https://plus.google.com/share?url=" title="Google Plus Share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img src="../assets/google-plus.png" /></a>
                </div>
            </div>
            {this.injectRatingsContent()}
            </div>
      </div>
    );
  }

}

export default SingleOutfitView;
