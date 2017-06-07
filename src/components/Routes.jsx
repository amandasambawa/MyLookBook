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

const PrivateRoute = ({ component: Component, uid, setTitle,setGlobal, setItemCount, navFrom, addSteps, addTooltip, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      uid
        ? <Component uid={uid} setTitle={setTitle} setGlobal={setGlobal} navFrom={navFrom} addSteps={addSteps}
        addTooltip={addTooltip} {...props} />
        : <Redirect to={{ pathname: "/login" }} />}
  />



);

const RateRoute = ({ component: Component, uid, navFrom, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        <Component uid={uid} navFrom={navFrom} {...props} />}
  />
);

const GlobalRoute = ({ component: Component, uid, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      uid
        ? <Component uid={uid} {...props} />
        : <Redirect to={{ pathname: "/login" }} />}
  />
);

module.exports = {
  PublicRoute,
  PrivateRoute,
  RateRoute,
  GlobalRoute
}
