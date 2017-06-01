import React, { Component } from 'react';
import Joyride from 'react-joyride';
import { auth,database } from '../firebase.js';
import {PrivateRoute, PublicRoute, RateRoute} from './Routes.jsx';
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
      isReady: false,
      isRunning: false,
      stepIndex: 0,
      steps: [

        ],
      selector: '',
      itemCount:0
    }
    this.getUserName = this.getUserName.bind(this);
    this.setGlobal = this.setGlobal.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setItemCount = this.setItemCount.bind(this);
    this.addSteps = this.addSteps.bind(this);

  }

  // {
  //   title: 'Auto Scroll',
  //   text: 'Scroll to correct position if required. <i>It can be turned off</i>',
  //   selector: '#outfitCreationContainer',
  //   position: 'top',
  //   style: {
  //     mainColor: '#a350f0',
  //     beacon: {
  //       inner: '#a350f0',
  //       outer: '#a350f0',
  //     },
  //   },
  // },
  // {
  //   title: 'Hide Elements',
  //   text: 'Sample texti is here',
  //   textAlign: 'center',
  //   selector: '#outfitNameField',
  //   position: 'left',
  //   style: {
  //     backgroundColor: '#12d217',
  //     borderRadius: 0,
  //     color: '#fff',
  //     mainColor: '#fff',
  //     textAlign: 'center',
  //     beacon: {
  //       inner: '#12d217',
  //       outer: '#12d217',
  //     },
  //     skip: {
  //       display: 'none',
  //     },
  //     back: {
  //       display: 'none',
  //     },
  //   },
  // },

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

  addSteps(steps) {
  let newSteps = steps;

  if (!Array.isArray(newSteps)) {
    newSteps = [newSteps];
  }

  if (!newSteps.length) {
    return;
  }

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
    console.log('%ccallback', 'color: #47AAAC; font-weight: bold; font-size: 13px;'); //eslint-disable-line no-console
    console.log(data); //eslint-disable-line no-console

    this.setState({
      selector: data.type === 'tooltip:before' ? data.step.selector : '',
    });
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

  setItemCount(itemCount){
    this.setState({itemCount: itemCount});
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
       let jr = (
           <Joyride
             ref={c => (this.joyride = c)}
             callback={this.callback}
             debug={false}
             disableOverlay={selector === '.card-tickets'}
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
             stepIndex={stepIndex}
             steps={steps}
             type={joyrideType}

           />);

         }
return (
       <div className="app">

       {self.jr}

        <Joyride ref={c => (this.joyride = c)} run={true} steps={this.state.steps} debug={true} autoStart={true} showOverlay={false}/>


      <Router>

        <div>
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <RateRoute path='/globalFeed' component={GlobalFeed} uid={this.state.uid}/>

            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid} setGlobal={this.setGlobal} setTitle={this.setTitle} setItemCount={this.setItemCount} joyrideType={joyrideType}
              joyrideOverlay={joyrideOverlay}
              onClickSwitch={this.onClickSwitch}
              addSteps={this.addSteps}

              addTooltip={this.addTooltip}/>

            <PrivateRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/publicOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
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
