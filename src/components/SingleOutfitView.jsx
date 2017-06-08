import React, {Component} from 'react';
import {database, auth} from '../firebase.js';
import Rate from 'rc-rate';
import Feed from './Feed.jsx';
import "../styles/stars.css";
import "../styles/SingleOutfitView.css";
import {Redirect} from 'react-router-dom';
import Logout from './Logout.jsx'
import NotificationSystem from 'react-notification-system';

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
      confirm: false,
      title: ""
    }
    this.loadRatings = this.loadRatings.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.injectRatingsContent = this.injectRatingsContent.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
    this.removeConfirm = this.removeConfirm.bind(this);
    this.injectOutfitItems = this.injectOutfitItems.bind(this);
    this.loadShareLinks = this.loadShareLinks.bind(this);
  }

  componentDidMount() {
    //grab outfit image in database
    let compositionTotal = 0;
    let trendyTotal = 0;
    let averageUsers = 0;
    let ratingArray = [];
    let image = null;
    let globalHolder = false;

    //initializing the database variables
    let dataBase = "";
    //Singleoutview database
    if (!this.props.testing && this.props.location.pathname.charAt(1) === 's') {
      dataBase = database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`);
    } else {
      //publicview database
      dataBase = database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}`);
      globalHolder = true;
    }
    this.setState({global:globalHolder});

    //grabbing the image from database
    dataBase.once("value").then((snapshot) => {
      image = snapshot.child("img").val();
      let uid = snapshot.child("uid").val();
      if (this.props.uid) {
        uid = this.props.uid;
      }
      let title = snapshot.child("title").val();
      this.setState({outfitImage: image, uid: uid , title: title });
    });

    dataBase.child("ratings").once("value").then((snapshot) => {
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

    let databaseItems = dataBase.child("items");
    databaseItems.once("value").then((snapshot) => {
      let arrayItem = [];
      snapshot.forEach(function(childSnapshot) {
        let arr = [];
        arr.push(childSnapshot.child("imgUrl").val());
        arr.push(childSnapshot.child("macysUrl").val());
        arr.push(childSnapshot.child("productId").val());
        arrayItem.push(arr);
      });
      this.setState({wishlistItems: arrayItem, global:globalHolder});
    });

  }

  loadShareLinks() {
    if (this.props.navFrom === "globalFeed") {
      return (
          <div id="shareLinkButtons">
            <a id="fbShare" href="https://www.facebook.com/sharer.php?u=" title="Facebook share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/facebook.svg"/></a>
            <a className="socialMediaLink" id="tShare" href="https://twitter.com/share?url=;text=Rate my Outfit" title="Twitter share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/twitter.svg"/></a>
            <a className="socialMediaLink" id="gpShare" href="https://plus.google.com/share?url=" title="Google Plus Share" target="rateView/${this.props.uid}/${this.props.match.params.outfitId}"><img className="socialMediaIcon" src="../assets/google-plus.svg"/></a>
            <a className="socialMediaLink" id="pShare" href="https://www.pinterest.com/"><img className="socialMediaIcon" src="../assets/pinterest.svg"/></a>
            <a className="socialMediaLink" id="mShare" href={`sms:&body='Hey! Check out my Macys Magic Lookbook here:${this.props.uid}/${this.props.match.params.outfitId}'`}><img className="socialMediaIcon" src="../assets/chatIcon.svg"/></a>
          </div>
      );
    } else {
      return (
        <div>
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
        </div>
      );
    }

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
    if (this.state.ratings.length === 0 && this.state.global === false) {
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
          <div className="ratingsContainer" id="overallRatingsContainer">

            <div className="ratingsLabel">Overall Composition</div>
            <Rate value={this.state.compositionRating} style={{
              fontSize: 30
            }} allowHalf/>

            <div className="ratingsLabel">Overall Trendy</div>
            <Rate value={this.state.trendyRating} style={{
              fontSize: 30
            }} allowHalf/>
          </div>

            <main>
                <input id="toggle" type="checkbox" />
                <label id="ratingsLabelContainer" htmlFor="toggle">Ratings and Comments</label>
                <div id="expand">
                    <section>
                        {this.loadRatings()}
                    </section>
                </div>
            </main>
        </div>

      );

    }

    return ratingsContent;
  }

  injectOutfitItems() {
      return this.state.wishlistItems.map((item) => {

          return (
              <div className="wishlistItems">
                  <a href={item[1]} target="_blank">
                    <img className="categoryItems" src={item[0]} />
                  </a>
                  <img className="wishlistAdd" onClick={() => this.addToWishList(item[2])} src="../assets/plus-icon.png"/>
              </div>
          );
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
    this.refs.notificationSystem.clearNotifications();
    this.refs.notificationSystem.addNotification({
      message: `Copied to clipboard!`,
      level: 'success'
  });
  }

  //removeOutfit is a function that creates a button and hides it depending on
  //whether or not it is a global view or personal view
  removeOutfit() {
    if (this.state.global === false) {
      return (
        <div style={ {textAlign: "center", marginTop: "1em"} }>
          <button onClick={this.removeConfirm} className="button" style={{ width: "90%", background: "lightgrey", color: "black" }}>Delete Outfit</button>
        </div>
      );
    } else {
      //do nothing
    }
  }

  //removeConfirm is a function that prompts the user whether or not the user
  //really wants to delete the outfit.
  removeConfirm() {
    this.refs.notificationSystem.clearNotifications();
    this.refs.notificationSystem.addNotification({
      message: `Are you sure you want to delete this outfit?`,
      level: `error`,
      autoDismiss: 0,
      action: {
      label: 'DELETE',
        callback: () => {
          database.ref(`/users/${this.props.uid}/outfitobjects/${this.props.match.params.outfitId}`).remove();
          database.ref(`/global/outfitobjects/${this.props.match.params.outfitId}`).remove();
          this.setState({confirm:true});
        }
      }
  });


  }

  addToWishList(productId) {
    var userId = "12564949299"; // "12570015021";
    console.log("Added to wishlist -"+ productId);
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
    }).then((response)=> {
      // console.log(response);
      // if (!response.ok) {
      //     throw Error(response.statusText);
      // }
      return response;
    }).then((data)=> {
      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `Successfully Added to Wishlist!`,
        level: 'success'
    });
    }).catch((err)=> {
      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `Failed to add to Wishlist! ` + err,
        level: 'error'
    });
    });
  }

  render() {
    if (this.state.confirm === true) {
      return (<Redirect to="/feed"/>)
    }
    return (
      <div>
          <div style={ {textAlign: "center", marginTop: "5px"} }>
            <h2>{this.state.title}</h2>
          </div>

        <div id="singleOutfitViewContainer">
          <div className="imageIDContainer">
            <img className="imageID" src={this.state.outfitImage}/>
          </div>
          <div id="linkContainer">
            {this.loadShareLinks()}
            <div id="wishlistContainer">
              <h2>Add Items to Wishlist:
              </h2>
              <div className="scrollmenu">
                {this.injectOutfitItems()}
              </div>
            </div>
          </div>
          {this.injectRatingsContent()}
            {this.removeOutfit()}
        </div>
          <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }

}

export default SingleOutfitView;
