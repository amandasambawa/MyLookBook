import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import RateView from '../src/components/RateView.jsx';
import Rate from 'rc-rate';

//Make sure that the RateView jsx page can even reder.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RateView />, div);
});

//Make sure the Comment UI is loading probably
it('renders Title of the page', () => {
  const wrapper = mount(<RateView />);
  const title =           <div className="ratingsLabel">
            Comment
          </div>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(title)).toEqual(true);
});

//make sure the rate stars are appearing on the page
describe('RateView', () => {
    it('check if we have rates working', () => {
        const wrapper = mount(<RateView />);
        const title =       <div
                className="rc-rate-star-first">
                ★
              </div>;
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
