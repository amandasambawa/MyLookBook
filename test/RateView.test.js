import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import RateView from '../src/components/RateView.jsx';
import Rate from 'rc-rate';


/*
* This test file is for RateView
*
*/


/*
* The following tests encompass the UI.
*/

//Make sure the Composition UI is loading properly
it('renders the Comment Section of the page', () => {
  const wrapper = shallow(<RateView />);
  const title =           <div className="ratingsLabel">
            Composition
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});

//Make sure the Trendy UI is loading properly.
it('renders the Trendy section of the page', () => {
  const wrapper = shallow(<RateView />);
  const title =           <div className="ratingsLabel">
            Trendy
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});


//Make sure the Comment UI is loading properly
it('renders the Comment Section of the page', () => {
  const wrapper = shallow(<RateView />);
  const title =           <div className="ratingsLabel">
            Comment
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});

//make sure the images are okay
describe('RateView', () => {
    it('check if the images loading up', () => {

        const wrapper = shallow(<RateView />);
        console.log(wrapper.debug());
        expect(wrapper.contains(title)).toEqual(true);
    });
  });

//Make sure that it renders
/*

it('should update the src state on clicking fetch', function () {
  const wrapper = render(<RateView />);
  wrapper.setState({ haveSaved : false });
  expect(wrapper.state('haveSaved')).to.equal('false');
});*/
