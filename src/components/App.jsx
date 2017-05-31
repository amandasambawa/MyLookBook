import React, { Component } from 'react';
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
      title: null
    }
    this.getUserName = this.getUserName.bind(this);
    this.setGlobal = this.setGlobal.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.walkthrough = this.walkthrough.bind(this);
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

  walkthrough() {
    return (
     <div className="app">
     <Joyride
       ref="joyride"
       steps={[arrayOfSteps]}
       run={true} // or some other boolean for when you want to start it
       debug={true}

       />
       <Joyride ref={c => (this.joyride = c)} run={true} steps={this.state.steps} debug={true}/>

     </div>
   );
 }

 var stepOne =
{
  title: 'First Step',
  text: 'Start using the <strong>joyride</strong>', // supports html tags
  selector: '.first-step',
  position: 'bottom-left',
  type: 'hover',
  isFixed: true,
  // optional styling
  style: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '0',
    color: '#fff',
    mainColor: '#ff4456',
    textAlign: 'center',
    width: '29rem',
    arrow: {
      display: 'none'
    },
    beacon: {
      offsetX: 10,
      offsetY: 10,
      inner: '#000',
      outer: '#000'
    },
    header: {
      textAlign: 'right'
      // or any style attribute
    },
    main: {
      padding: '20px'
    },
    footer: {
      display: 'none'
    },
    skip: {
      color: '#f04'
    },
    hole: {
      backgroundColor: 'rgba(201, 23, 33, 0.2)',
    }

  },
  // custom params...
  name: 'my-first-step',
  parent: 'MyComponentName'
};

var stepOne =
{
 title: 'Second Step',
 text: 'Start using the <strong>joyride</strong>', // supports html tags
 selector: '.second-step',
 position: 'bottom-left',
 type: 'hover',
 isFixed: true,
 // optional styling
 style: {
   backgroundColor: 'rgba(0, 0, 0, 0.8)',
   borderRadius: '0',
   color: '#fff',
   mainColor: '#ff4456',
   textAlign: 'center',
   width: '29rem',
   arrow: {
     display: 'none'
   },
   beacon: {
     offsetX: 10,
     offsetY: 10,
     inner: '#000',
     outer: '#000'
   },
   header: {
     textAlign: 'right'
     // or any style attribute
   },
   main: {
     padding: '20px'
   },
   footer: {
     display: 'none'
   },
   skip: {
     color: '#f04'
   },
   hole: {
     backgroundColor: 'rgba(201, 23, 33, 0.2)',
   }

 },
 // custom params...
 name: 'my-second-step',
 parent: 'MyComponentName'
};

  render() {
    return (
      <Router>
        {walkthrough}
        <div>
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <RateRoute path='/globalFeed' component={GlobalFeed} uid={this.state.uid}/>
            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid} setGlobal={this.setGlobal} setTitle={this.setTitle}/>
            <PrivateRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/publicOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/rateView/:userId/:outfitId' component={RateView} uid={this.state.uid}/>
            <RateRoute path='/confirmation' component={Confirmation} uid={this.state.uid}/>
            <PublicRoute component={NoMatch}/>
          </Switch>
          <Navigation userName={this.state.uname} uid={this.state.uid} global={this.state.global} title={this.state.title}/>
        </div>
      </Router>
    );
  }
};

export default App;
