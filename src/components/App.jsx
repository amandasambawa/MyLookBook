import React, { Component } from 'react';
import { auth } from '../firebase.js';
import PropsRoute from './PropsRoute.jsx';
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
      loggedIn: false,
      uid: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        this.setState({uid: user.uid, loggedIn: true});
      } else {
        console.log("user logged out");
        this.setState({uid: null, loggedIn: false});
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
          </ul>

          <Switch>
            <Redirect exact from='/' to='/login'/>
            <PropsRoute path='/login' component={LoginPage} loggedIn={this.state.loggedIn} uid={this.state.uid}/>
            <PropsRoute path='/feed' component={Feed} loggedIn={this.state.loggedIn} uid={this.state.uid}/>
            <PropsRoute path='/outfitCreation' component={OutfitCreation} loggedIn={this.state.loggedIn} uid={this.state.uid}/>
            <PropsRoute path='/singleOutfit/:outfitId' component={SingleOutfitView} loggedIn={this.state.loggedIn} uid={this.state.uid}/>
            <PropsRoute path='/rate/:outfitId' component={RateView} loggedIn={this.state.loggedIn} uid={this.state.uid}/>
            <PropsRoute component={NoMatch}/>
          </Switch>
        </div>
      </Router>

    );
  }
};

export default App;
