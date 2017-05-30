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
  const wrapper2 = mount(<GlobalFeed />);
});



/*
* UI tests begin here
*/

//make sure the initial divs are loaded up and proper.
describe('GlobalFeed', () => {
    it('check if the title loading up', () => {
        const wrapper = shallow(<GlobalFeed />);
        const title =
        <h2 id="feedTitle">
        Feed
        </h2>;
        expect(wrapper.contains(title)).toEqual(true);
    });
  });


//make sure the images space in the webpage.
describe('GlobalFeed', () => {
    it('check if the image space is loading up', () => {
        const wrapper = shallow(<GlobalFeed />);
        const image = wrapper.find('img').exists();
        expect(image).toEqual(true);
    });
  });


/*
* Functionality tests begin here
*/

//make sure loading content is actually putting stuff in the DOM.
//So long as this test does not result in an error, it's working properly.
describe('GlobalFeed', () => {
    it('check if loadingContent is working properly', () => {
        const wrapper = shallow(<GlobalFeed />);
        wrapper.instance().loadingContent();
    });
    });
