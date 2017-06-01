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
      itemCount:0
    }
    this.getUserName = this.getUserName.bind(this);
    this.setGlobal = this.setGlobal.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setItemCount = this.setItemCount.bind(this);
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

  setItemCount(itemCount){
    this.setState({itemCount: itemCount});
  }

  render() {
    return (
      <Router>
        <div>
          <a href="https://www.macys.com"><img src="../assets/macysNavBar.png" /></a>
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <GlobalRoute path='/globalFeed' component={GlobalFeed} uid={this.state.uid}/>
            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid} setGlobal={this.setGlobal} setTitle={this.setTitle} setItemCount={this.setItemCount}/>
            <PrivateRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/publicOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
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
