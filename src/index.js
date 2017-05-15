import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LoginPage';
import Feed from './components/Feed.jsx';
import SingleOutfitView from './components/SingleOutfitView.jsx';
import RateView from './components/RateView.jsx';
import NoMatch from './components/NoMatch.jsx';
import OutfitCreation from './components/OutfitCreation.jsx';
import './styles/LoginPage.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

const AppRouter = () => (
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
        <Route path='/login' component={LoginPage}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/outfitCreation' component={OutfitCreation}/>
        <Route path='/singleOutfit/:outfitId' component={SingleOutfitView}/>
        <Route path='/rate/:outfitId' component={RateView}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root')
);
