import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import Logout from '../src/components/Logout.jsx';


/*
* This test file is for Logout
*/



//Make sure that LoginPage is rendering properly.
it('Logout renders properly.', () => {
  const wrapper = shallow(<Logout />);
});



/*
* These tests encompass the UI
*/


//make sure that the image is loading up.
describe('Logout', () => {
    it('check if the image is loading up', () => {
        const wrapper = shallow(<Logout />);
        const img = wrapper.find('img').exists();
        expect(img).toEqual(true);
    });
  });


/*
* These tests encompass the functionality
*/

//make sure that logout is working. If there is no error, then this
//method is working and passing.
describe('Logout', () => {
    it('check if the image is loading up', () => {
        const wrapper = shallow(<Logout />);
        wrapper.instance().logout();
    });
  });
