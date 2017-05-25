import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import Navigation from '../src/components/Navigation.jsx';



/*
* This file is for testing for Navigation
*/


/*
* Declaring the parameters required to run Navigation
*/


//Make sure that LoginForm can even render.
it('LoginForm renders properly.', () => {
  let wrapper = shallow(<Navigation />);
  //console.log(wrapper.debug());
  let wrapper2 = mount(<Navigation />);
  let wrapper3 = render(<Navigation />);
  //console.log(wrapper2.debug());
});
