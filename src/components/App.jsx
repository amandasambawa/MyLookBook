import React, { Component } from 'react';
import { auth } from '../firebase.js';
import {PrivateRoute, PublicRoute, RateRoute} from './Routes.jsx';
import LoginPage from './LoginPage';
import Feed from './Feed.jsx';
import SingleOutfitView from './SingleOutfitView.jsx';
import RateView from './RateView.jsx';
import NoMatch from './NoMatch.jsx';
import OutfitCreation from './OutfitCreation.jsx';

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
      uid: null
    }
  }

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        this.setState({uid: user.uid});
      } else {
        console.log("user logged out");
        this.setState({uid: null});
      }
    });
  }

  render() {
    console.log("APP IS RENDERING")
    // TODO run checkIfLoggedIn only when the event is tirggered
    return (
      <Router>
        <div>
          <ul>
             <li><Link to="/feed">feed</Link></li>
             <li><Link to="/singleOutfit/1">Single Outfit</Link></li>
             <li><Link to="/login">Login</Link></li>
             <li><Link to="/outfitCreation">Create an outfit</Link></li>
             <li><Link to="/rateView/1">rate example(ONLY FOR TESTING)</Link></li>
          </ul>

          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PublicRoute path='/login' component={LoginPage} uid={this.state.uid}/>
            <PrivateRoute path='/feed' component={Feed} uid={this.state.uid}/>
            <PrivateRoute path='/outfitCreation' component={OutfitCreation} uid={this.state.uid}/>
            <PrivateRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} uid={this.state.uid}/>
            <RateRoute path='/rateView/:outfitId' component={RateView} uid={this.state.uid}/>
            <PublicRoute component={NoMatch}/>
          </Switch>

        </div>
      </Router>

    );
  }
};

export default App;
