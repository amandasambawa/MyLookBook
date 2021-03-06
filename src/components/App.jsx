import React, { Component } from 'react';
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

    return (
      <Router>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/macysNavBar.png?alt=media&token=2392f318-136e-49e6-a390-ce0e9b0ec758" />
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <GlobalRoute path='/globalFeed' component={GlobalFeed} uid={this.state.uid}/>
            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid} setGlobal={this.setGlobal} setTitle={this.setTitle} setItemCount={this.setItemCount}/>
            <PrivateRoute path='/singleOutfit/:outfitId' navFrom={"privateFeed"} component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/publicOutfit/:outfitId' navFrom={"globalFeed"} component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/rateView/:userId/:outfitId' component={RateView} uid={this.state.uid}/>
            <RateRoute path='/confirmation' component={Confirmation} uid={this.state.uid}/>
            <PublicRoute component={NoMatch}/>
          </Switch>
          <Navigation userName={this.state.uname} uid={this.state.uid} global={this.state.global} title={this.state.title} itemCount={this.state.itemCount}/>
        </div>
      </Router>
    );
  }
};

export default App;
