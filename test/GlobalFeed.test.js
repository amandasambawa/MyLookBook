import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import GlobalFeed from '../src/components/GlobalFeed.jsx';

/*
* This file is for testing for GlobalFeed
*/

//Make sure that GlobalFeed can even render.
it('GlobalFeed renders properly.', () => {
  const wrapper = shallow(<GlobalFeed />);
  console.log(wrapper.debug());
});

/*
* UI tests begin here
*/
