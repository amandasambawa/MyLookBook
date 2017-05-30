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
let uid = "1aVzjhagXhPbm0YWgfNyWRJIElf1";

//Make sure that LoginForm can even render.
it('Navigation renders properly.', () => {
  let wrapper = shallow(<Navigation uid={uid} />);
  console.log(wrapper.debug());
});
