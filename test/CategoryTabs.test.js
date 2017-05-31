import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import CategoryTabs from '../src/components/CategoryTabs.jsx';

/*
* This test file is for CategoryTabs
*/

//Make sure that CategoryTabs is rendering properly.
it('CategoryTabs renders properly.', () => {
  const wrapper = shallow(<CategoryTabs />);
  const wrapper2 = mount(<CategoryTabs />);
});


/*
* The following tests encompass the UI.
*/

//make sure that input boxes are loaded up
describe('CategoryTabs', () => {
    it('check if the divs are loading up', () => {
        const wrapper = shallow(<CategoryTabs />);
        const div = wrapper.find('div').exists();
        expect(div).toEqual(true);
    });
  });

//make sure that the images are loading up
describe('CategoryTabs', () => {
    it('check if the images are loading up', () => {
        const wrapper = mount(<CategoryTabs />);
        const image = wrapper.find('img').exists();
        expect(image).toEqual(true);
    });
  });

/*
* The following tests encompass the functionality.
*/

//Make sure setCategory is working
it('make sure that setCategory is working', () => {
  const wrapper = mount(<CategoryTabs />);
  wrapper.instance().setCategory('tops');
  expect(wrapper.state('selected')).toEqual('tops');
  wrapper.instance().setCategory('bottoms');
  expect(wrapper.state('selected')).toEqual('bottoms');
  wrapper.instance().setCategory('shoes');
  expect(wrapper.state('selected')).toEqual('shoes');
  wrapper.instance().setCategory('accessories');
  expect(wrapper.state('selected')).toEqual('accessories');
});
