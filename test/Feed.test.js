import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import Feed from '../src/components/Feed.jsx';

/*
* This file is for testing for Feed
*/

/*
* Declaring the parameters required to run Feed
*/

//Make sure that Feed can even render.
it('Feed renders properly.', () => {
  const wrapper = shallow(<Feed />);
    console.log(wrapper.debug());
});

/*
* UI tests begin here
*/


//make sure the link to create an outfit exists
describe('Feed', () => {
    it('check if create an outfit exists', () => {
        const wrapper = shallow(<Feed />);
        const linkObj = wrapper.find('Link');
        expect(linkObj.prop('to')).toEqual('/outfitCreation');
    });
  });

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

//Make sure that load outfits works. As long as loadoutfits does not cause an
//error, it is working properly.
it('make sure that loadOutfits is working properly.', () => {
    const wrapper = shallow(<Feed />);
    wrapper.instance().loadingContent();
  });

it('make sure that handleComposition is working properly.', () => {
    const wrapper = shallow(<Feed />);
    expect(wrapper.instance().logout() ).toEqual(true);
});
