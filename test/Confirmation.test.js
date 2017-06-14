import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import Confirmation from '../src/components/Confirmation.jsx';


/*
* This test file is for Confirmation
*/



//Make sure that Confirmation is rendering properly.
it('Confirmation renders properly.', () => {
  const wrapper = shallow(<Confirmation />);
});



/*
* These tests encompass the UI
*/

describe('Confirmation', () => {
    it('check if the Link is loading up', () => {
        const wrapper = shallow(<Confirmation />);
        const link = wrapper.find('Link').exists();
        expect(link).toEqual(true);
    });
  });

//make sure that the image is loading up.
describe('Confirmation', () => {
    it('check if the image is loading up', () => {
        const wrapper = shallow(<Confirmation />);
        const img = wrapper.find('img').exists();
        expect(img).toEqual(true);
    });
  });
