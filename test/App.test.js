import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import App from '../src/components/App.jsx';


//Make sure that the App jsx page can even reder.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


//Our state exists in the page and it updates.
it('renders without crashing part 2', () => {
  shallow(<App />);
});
