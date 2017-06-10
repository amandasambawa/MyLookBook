import React, {Component} from 'react';
import {database} from '../firebase.js';
import {Link} from 'react-router-dom';
import Logout from './Logout.jsx'
import "../styles/foundation.css";
import "../styles/Feed.css";
import Joyride from 'react-joyride';


const feedToJoyride   =  {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      isReady: true,
      isRunning: true,
      stepIndex: 0,
      steps: [
        {
          title: 'My Lookbook',
          text: 'You are currently in your lookbook',
          selector: '.feedLink',
          position: 'top',
        },
        {
          title: 'Create an Outift',
          text: 'Here is where you can design an outfit that will save to your feed or share it with the world',
          selector: '.createOutfitLink',
          position: 'top',
        },
        {
          title: 'Global Feed',
          text: `See other people's outfits and get inspiration`,
          selector: '.globalFeedLink',
          position: 'top',
        }
      ],
      selector: '',
    };

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previews: [],
      exists: false,
      title: "",
      tutorial: false,
    }
    this.loadingContent = this.loadingContent.bind(this);
    this.joyrideCreation = this.joyrideCreation.bind(this);
    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    let previewArray = [];
    //the line below references the database at the folder where the
    //outfits exist
    database.ref(`/users/${this.props.uid}/outfitobjects/`).once("value").then((snapshot) => {
      //iterating through each index of the database
      //console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot, key) {
        previewArray.push(childSnapshot);
      });
      previewArray.reverse();
      this.setState({previews: previewArray, exists: snapshot.val()});
    });

    let dataBase = database.ref(`/users/${this.props.uid}`);
    dataBase.child("tutorials").once("value").then((snapshot)=> {
        if(snapshot.child("feedTutorial").exists() ){
          let joyTemp = snapshot.child("feedTutorial").val();
          //if the tutorial is false, then we set the state to be false.
          this.setState({tutorial: joyTemp});
        }else{
          this.setState({tutorial: true})
        }
    });
  }


  callback(data) {

        if(data.type === "finished"){
          let tutorialRef = database.ref(`/users/${this.props.uid}/tutorials/feedTutorial`);
          tutorialRef.set({
            feedTutorial: Boolean(false)
          })
        }
  }

  joyrideCreation() {

    if(this.state.tutorial === true){
      const {
        isReady,
        isRunning,
        joyrideOverlay,
        joyrideType,
        selector,
        stepIndex,
        steps,
      } = feedToJoyride;

      return (
        <div>
          <Joyride
            ref={c => (this.joyride = c)}
            callback={this.callback}
            allowClicksThruHole={false}
            debug={false}
            locale={{
              back: (<span>Back</span>),
              close: (<span>Close</span>),
              last: (<span>Last</span>),
              next: (<span>Next</span>),
              skip: (<span>Skip</span>),
            }}
            run={isRunning}
            showOverlay={joyrideOverlay}
            showSkipButton={true}
            showStepsProgress={true}
            scrollToSteps={false}
            stepIndex={stepIndex}
            steps={steps}
            type={joyrideType}
          />
        </div>
      );
    }else{
  }
  }


  /*loadingContent is a method that uses the state "exists" to determine
  *which screen the user sees. The options are: a loading screen,
  *a call to action which prompts the user to create an outfit.
  *or the entire closet.
  */
  loadingContent(){
    //if state exists is false, we show a loading screen.
    if(this.state.exists === false){
      return <img id="loadingImg" src="http://apdw.com/images/balls_loading.gif?x13037"/>;
    //if state exists is null, we will prompt the user to create an outfit
    }else if(this.state.exists === null){
      return (
          <div className="feedContainer" style={{ position: "absolute", bottom: "0"}}>
              <img id="" src="../assets/empty-image.png" />
              <h1 className="redText">You have no outfits yet.</h1>
              <h2 className="spaceUnder">Start creating outfits here!</h2>
              <img id="downArrow" src="../assets/download-arrow.svg" />
          </div>
      );
      //we will default load the rest of the items in the closet.
    }else{
      return this.state.previews.map((preview) => {
      return (
        <div className="small-8 medium-4 large-4 columns">
            <span className="outfitName2">{preview.val().title}</span>
            <Link to={`/singleOutfit/${preview.key}`}><img className="outfitLink" src={preview.val().img}/></Link>
        </div>
        );
      });
    }
  }

  render() {
    return (
        <div>
          {this.joyrideCreation()}
          <Logout />
          <div id="lookbookContainer">
              <h2 id="lookbookHeader">My Macy's Lookbook</h2>
              <div className="row" id="lookbookRow">
                  {this.loadingContent()}
              </div>
          </div>
        </div>
    );
  }

}

export default Feed;
