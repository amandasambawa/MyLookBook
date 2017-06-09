import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import Feed from '../src/components/Feed.jsx';

/*
* This file is for testing for Feed
*/

//Make sure that Feed can even render.
it('Feed renders properly.', () => {
  const wrapper = shallow(<Feed />);
});

/*
* UI tests begin here
*/


//make sure the images load space in the webpage.
describe('Feed', () => {
    it('check if the images loading up', () => {
        const wrapper = shallow(<Feed />);
        const image = wrapper.find('img').exists();
        expect(image).toEqual(true);
    });
  });


/*
* The following tests encompass the functionality
*/

//Make sure that loadConents works. As long as loadcontents does not cause an
//error, it is working properly.
it('make sure that loadingContents is working properly.', () => {
    const wrapper = shallow(<Feed />);
    wrapper.instance().loadingContent();
  });

  //Make sure that joyrideCreation works. As long as joyrideCreation
  //does not cause an error, it is working properly.
it('make sure that joyrideCreation is working properly.', () => {
    const wrapper = shallow(<Feed />);
    wrapper.instance().joyrideCreation();
});
