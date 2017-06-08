import React, { Component } from 'react';
import Joyride from 'react-joyride';
import { auth,database } from '../firebase.js';
import {PrivateRoute, PublicRoute, RateRoute, GlobalRoute} from './Routes.jsx';
import LoginPage from './LoginPage';
import Feed from './Feed.jsx';
import GlobalFeed from './GlobalFeed.jsx'
import SingleOutfitView from './SingleOutfitView.jsx';
import RateView from './RateView.jsx';
import NoMatch from './NoMatch.jsx';
import OutfitCreation from './OutfitCreation.jsx';
import Confirmation from './Confirmation.jsx';
import Navigation from './Navigation.jsx';
import "../styles/foundation.css";
import "../styles/foundation2.css";
import "../styles/react-joyride-compiled.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      uid: null,
      uname: null,
      global: null,
      title: null,
      joyrideOverlay: true,
      joyrideType: 'continuous',
      isReady: true,
      isRunning: true,
      stepIndex: 0,
      steps: [],
      selector: '',
    }
    this.getUserName = this.getUserName.bind(this);
    this.setGlobal = this.setGlobal.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.addSteps = this.addSteps.bind(this);
    this.next = this.next.bind(this);
    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({uid: user.uid});
        this.getUserName();
      } else {
        this.setState({uid: null});
      }
    });

    setTimeout(() => {
      this.setState({
        isReady: true,
        isRunning: true,
      });
    }, 1000);
  }

  // addSteps(steps) {
  //   let newSteps = steps;
  //
  //   if (!Array.isArray(newSteps)) {
  //     newSteps = [newSteps];
  //   }
  //
  //   if (!newSteps.length) {
  //     return;
  //   }
  //   let coolSteps = [...this.state.steps, ...newSteps];
  //   // Force setState to be synchronous to keep step order.
  //   this.setState({
  //     steps: coolSteps
  //   });
  // }
  addSteps(steps) {
    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    // Force setState to be synchronous to keep step order.
    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(newSteps);
      return currentState;
    });
  }


  addTooltip(data) {
    this.joyride.addTooltip(data);
  }

  next() {
    this.joyride.next();
  }

  callback(data) {
    console.log("CALLBACK DATA GOD", data); //eslint-disable-line no-console
    if(data.type === "finished"){
      this.setState({
        steps: {},
    //     stepIndex: 0,
    //     isRunning: true,
    //     isReady: true
      });
    }else{
      this.setState({
        selector: data.type === 'tooltip:before' ? data.step.selector : '',
      });
    }

  }

  onClickSwitch(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const state = {};

    if (el.dataset.key === 'joyrideType') {
      this.joyride.reset();

      setTimeout(() => {
        this.setState({
          isRunning: true,
        });
      }, 300);

      state.joyrideType = e.currentTarget.dataset.type;
    }

    if (el.dataset.key === 'joyrideOverlay') {
      state.joyrideOverlay = el.dataset.type === 'active';
    }

    this.setState(state);
  }

  getUserName(){
    database.ref(`/users/${this.state.uid}/`)
    .once("value").then((snapshot)=> {
        var userName = snapshot.child("username").val();
        this.setState({ uname: userName });
    });
  }

  setGlobal(global){
    this.setState({global : Boolean(global)})
  }

  setTitle(title){
    this.setState({title : title})
  }

  render() {

    const {
      isReady,
      isRunning,
      joyrideOverlay,
      joyrideType,
      selector,
      stepIndex,
      steps,
    } = this.state;

    if (isReady) {
      var jr =
                    <Joyride
                      ref={c => (this.joyride = c)}
                      allowClicksThruHole = {false}
                      callback={this.callback}
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
                    />;


         }

    return (
      <div className="app">
       {jr}
        <Router>
          <div>
            <a href="https://www.macys.com"><img src="https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/macysNavBar.png?alt=media&token=2392f318-136e-49e6-a390-ce0e9b0ec758" /></a>
            <Switch>
              <Redirect exact from='/' to='/login'/>
              <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
              <PrivateRoute path='/feed' component={Feed} uid={this.state.uid} addSteps={this.addSteps} />
              <GlobalRoute path='/globalFeed' component={GlobalFeed} uid={this.state.uid}/>
              <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid} setGlobal={this.setGlobal} setTitle={this.setTitle}
              addSteps={this.addSteps} addTooltip={this.addTooltip}/>
              <PrivateRoute path='/singleOutfit/:outfitId' navFrom={"privateFeed"} component={SingleOutfitView} uid={this.state.uid}/>
              <RateRoute path='/publicOutfit/:outfitId' navFrom={"globalFeed"} component={SingleOutfitView} uid={this.state.uid}/>
              <RateRoute path='/rateView/:userId/:outfitId' component={RateView} uid={this.state.uid}/>
              <RateRoute path='/confirmation' component={Confirmation} uid={this.state.uid}/>
              <PublicRoute component={NoMatch}/>
            </Switch>
            <Navigation userName={this.state.uname} uid={this.state.uid} global={this.state.global} title={this.state.title} itemCount={this.state.itemCount}/>
          </div>
        </Router>
      </div>
    );
  }
};

export default App;
