import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import RateView from '../src/components/RateView.jsx';
import renderer from 'react-test-renderer';
import Rate from 'rc-rate';

//Make sure that the RateView jsx page can even reder.
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RateView />, div);
});

//Make sure that the RateView jsx page can even reder.
it('renders without crashing3', () => {
  render(<RateView />);
});

it('renders Title of the page', () => {
  const wrapper = shallow(<RateView />);
  const title = <h1>RateView</h1>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(title)).toEqual(true);
});


it('renders correctly', () => {
  const tree = renderer.create(
    <RateView />).toJSON();
  expect(tree).toMatchSnapshot();
});

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

  describe('RateView', () => {
      it('we can set our states', () => {
          const wrapper = mount(<RateView />);
          expect(wrapper.find('.imageIDContainer')).to.have.length(0);
      });
    });

//Make sure that it renders
/*

it('should update the src state on clicking fetch', function () {
  const wrapper = render(<RateView />);
  wrapper.setState({ haveSaved : false });
  expect(wrapper.state('haveSaved')).to.equal('false');
});*/
