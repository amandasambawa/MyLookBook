import React, {Component} from 'react';
import {database, auth} from '../firebase.js';
import Rate from 'rc-rate';
import Feed from './Feed.jsx';
import "../styles/stars.css";
import "../styles/SingleOutfitView.css";
import { Redirect } from 'react-router-dom';
import AlertContainer from 'react-alert';

class SingleOutfitView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oufitImage: 0,
      compositionRating: 0,
      trendyRating: 0,
      ratings: [],
      wishlistItems: [],
      uid: "",
      global: false,
      confirm: false
    }
    this.loadRatings = this.loadRatings.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.injectRatingsContent = this.injectRatingsContent.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.removeConfirm = this.removeConfirm.bind(this);
    this.injectOutfitItems = this.injectOutfitItems.bind(this);
  }



  globalAlert = () => {
    this.msg.show('You cannot delete objects in Global Feed!', {
      time: 2000,
      type: 'success',
    })
  }

  //This is the logout method, checks if there is a user logged in and logs out
  //if they are logged in, else do nothing
  logout() {
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.

    }).catch(function(error) {
      console.log("error logging out")
      // An error happened.
      return false;
    });
    return true;
  }

  componentDidMount() {
    //grab outfit image in database
    let compositionTotal = 0;
    let trendyTotal = 0;
    let averageUsers = 0;
    let ratingArray = [];
    let image = null;

    //initializing the database variables
    let dataBaseIMG = "";
    let dataBaseRating = "";
    //Singleoutview database
    if (!this.props.testing && this.props.location.pathname.charAt(1) === 's') {
      dataBaseIMG = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`);
      dataBaseRating = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/ratings/`);

      this.setState({global: false});
    } else {
      //publicview database
      dataBaseIMG = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}`);
      dataBaseRating = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}/ratings/`);
      this.setState({global:true});
    }
    //grabbing the image from database

    dataBaseIMG.once("value").then((snapshot) => {
      image = snapshot.child("img").val();
      let uid = snapshot.child("uid").val();
      if (this.props.uid) {
        this.setState({outfitImage: image, uid: this.props.uid});
      } else {
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


      let databaseItems = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}/items/`);
      databaseItems.once("value").then((snapshot) => {
          let arrayItem = [];
          snapshot.forEach(function(childSnapshot) {
              let arr = [];
              arr.push(childSnapshot.child("imgUrl").val());
              arr.push(childSnapshot.child("macysUrl").val());
              arr.push(childSnapshot.child("productId").val());
              arrayItem.push(arr);
          });
          this.setState({wishlistItems: arrayItem});
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

  //a function that works depending on whether or not this outfit has ratings/
  //coments. If there are any ratings/comments, upload them, else prompt the
  //user to create an outfit
  injectRatingsContent() {
    //check if ratings is empty
    var ratingsContent;
    if (this.state.ratings.length === 0) {
      ratingsContent = <div id="noRatingsPlaceholder">

        <h1 id="noRatingsHeader">
          No ratings yet
        </h1>
        <div>
          Share the link with your friends and get instant feedback on your outfits!</div>

      </div>;
    } else {

      ratingsContent = (
        <div id="container">
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

      );

    }

    return ratingsContent;
  }

  injectOutfitItems() {
      return this.state.wishlistItems.map((item) => {
          return (
              <span>
                  <a href={item[1]}>
                    <img className="categoryItems" src={item[0]} />
                  </a>
              </span>
          );
      })
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
      })
    }

  //handleFocus is a function that allows the application to "focus" on the
  //machine
  handleFocus(event) {
    event.target.select();
  }

  //copyToClipboard is a function that allows us to save a link to the user's
  //clipboard
  copyToClipboard() {
    document.querySelector("#linkCopy").select();
    document.execCommand('copy');
    this.showAlert();
  }

  //removeOutfit is a function that creates a button and hides it depending on
  //whether or not it is a global view or personal view
  removeOutfit() {
    if(this.state.global === false){
        return (
          <div>
               <button onClick={this.removeConfirm} className="button">removeOutfit</button>
          </div>
        );
      }else {
      //do nothing
    }
  }

  //removeConfirm is a function that prompts the user whether or not the user
  //really wants to delete the outfit.
  removeConfirm(){
    if (window.confirm("Are you sure you want to delete this outfit?") === true) {
      database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`).remove();
      database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}`).remove();
      this.setState({confirm: true});
    } else {
      this.setState({confirm: false});
      }
    }

  addToWishList() {
    var userId = "12570015021";
    var productId = 36728786;
    var data = JSON.stringify({
      "wishlists": {
        "wishlist": [
          {
            "fromSource": "PDP",
            "items": [
              {
                "upc": {
                  "id": productId
                },
                "qtyRequested": 1
              }
            ],
            "customer": {
              "id": userId
            }
          }
        ]
      }
    });
    fetch('https://m.macys.com/api/customer/v2/wishlists', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: data
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("data", data);
    });
  }

  render() {
    if (this.state.confirm === true ){
      return (
      <Redirect to="/feed"/>
      )
    }
    return (
      <div>
        <div id="logoutContainer" onClick={this.logout}><img className="navIcon" src="../assets/logout.svg"/></div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
        <button className="button" onClick={this.addToWishList}>addToWishList</button>
        {this.removeOutfit()}
        <div id="singleOutfitViewContainer">
          <div className="imageIDContainer">
            <img className="imageID" src={this.state.outfitImage}/>
          </div>
          <div id="linkContainer">
            <span id="linkTitle">Link:</span>

            <input id="linkCopy" className="link" type="text" onFocus={this.handleFocus} value={`rateView/${this.state.uid}/${this.props.match.params.outfitId}`}/>
            <span>
              <button className="button" id="copyButton" onClick={this.copyToClipboard}>Copy link</button>
            </span>
            <div id="shareLinkButtons">
              <a id="fbShare" href="https://www.facebook.com/sharer.php?u=" title="Facebook share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/facebook.svg"/></a>
              <a className="socialMediaLink" id="tShare" href="https://twitter.com/share?url=;text=Rate my Outfit" title="Twitter share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/twitter.svg"/></a>
              <a className="socialMediaLink" id="gpShare" href="https://plus.google.com/share?url=" title="Google Plus Share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/google-plus.svg"/></a>
              <a className="socialMediaLink" id="pShare" href="https://www.pinterest.com/"><img className="socialMediaIcon" src="../assets/pinterest.svg"/></a>
              <a className="socialMediaLink" id="mShare" href={`sms:&body='Hey! Check out my Macys Magic Lookbook here:${this.props.uid}/${this.props.match.params.outfitId}'`}><img className="socialMediaIcon" src="../assets/chatIcon.svg"/></a>
            </div>
            <div id="wishlistContainer">
               <h2>Add Items to Wishlist: </h2>
                <div className="scrollmenu">
                    {this.injectOutfitItems()}
                </div>
            </div>
          </div>
          {this.injectRatingsContent()}
        </div>
      </div>
    );
  }

}

export default SingleOutfitView;
