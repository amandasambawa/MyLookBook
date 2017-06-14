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
let userName = "testUser";
let uid = "1aVzjhagXhPbm0YWgfNyWRJIElf1";
let title= "test";
//Make sure that LoginForm can even render.
it('Navigation renders properly.', () => {
  let wrapper = shallow(<Navigation userName={userName} uid={uid} title={title} />);
});
