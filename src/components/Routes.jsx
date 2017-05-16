import {  Route, Redirect } from 'react-router-dom';
import React from 'react';

const PublicRoute = ({ component: Component, uid, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      uid
        ? <Redirect to={{ pathname: "/feed" }} />
        : <Component uid={uid} {...props} />}
  />
);

const PrivateRoute = ({ component: Component, uid, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      uid
        ? <Component uid={uid} {...props} />
        : <Redirect to={{ pathname: "/login" }} />}
  />
);

const RateRoute = ({ component: Component, uid, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      uid
        ? <Redirect to="/singleOutfit/1"/>
        : <Component uid={uid} {...props} />}
  />
);

module.exports = {
  PublicRoute,
  PrivateRoute,
  RateRoute
}