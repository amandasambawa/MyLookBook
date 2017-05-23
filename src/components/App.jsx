import React, { Component } from 'react';
import { auth,database } from '../firebase.js';
import {PrivateRoute, PublicRoute, RateRoute} from './Routes.jsx';
import LoginPage from './LoginPage';
import Feed from './Feed.jsx';
import SingleOutfitView from './SingleOutfitView.jsx';
import RateView from './RateView.jsx';
import NoMatch from './NoMatch.jsx';
import OutfitCreation from './OutfitCreation.jsx';
import Confirmation from './Confirmation.jsx';
import Navigation from './Navigation.jsx';
import "../styles/foundation.css"
import "../styles/foundation2.css"

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
      uname: null
    }
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        this.setState({uid: user.uid});
        this.getUserName();
      } else {
        console.log("user logged out");
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

  render() {
    return (
      <Router>
        <div>
          <Navigation userName={this.state.uname} uid={this.state.uid}/>
          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid}/>
            <PrivateRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/rateView/:userId/:outfitId' component={RateView} uid={this.state.uid}/>
            <RateRoute path='/confirmation' component={Confirmation} uid={this.state.uid}/>
            <PublicRoute component={NoMatch}/>
          </Switch>

        </div>
      </Router>
    );
  }
};

export default App;
