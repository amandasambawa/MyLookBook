import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import html2canvas from 'html2canvas';
import SaveOutfitButton from '../src/components/SaveOutfitButton.jsx';



/*
* This test file is for SaveOutfitButton
*/

//Make sure that SaveOutfitButtonis rendering properly.
it('SaveOutfitButton renders properly.', () => {
  const wrapper = shallow(<SaveOutfitButton />);
  console.log(wrapper.debug());
  const wrapper2 = mount(<SaveOutfitButton />);
});


/*
* The following tests encompass the UI.
*/

//make sure that the divs are loaded up
describe('SaveOutfitButton', () => {
    it('check if the divs are loading up', () => {
        const wrapper = shallow(<SaveOutfitButton />);
        const div = wrapper.find('div').exists();
        expect(div).toEqual(true);
    });
  });

//make sure that the image is loaded up
describe('SaveOutfitButton', () => {
    it('check if the img is loading up', () => {
        const wrapper = shallow(<SaveOutfitButton />);
        const img = wrapper.find('img');
        expect(img.prop('id')).toEqual("saveCloudIcon");
    });
  });
;
