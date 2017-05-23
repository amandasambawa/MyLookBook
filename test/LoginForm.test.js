import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render} from 'enzyme';
import LoginForm from '../src/components/RateView.jsx';


//Make sure that the RateView jsx page can even reder.
it('renders without crashing', () => {
  shallow(<LoginForm />);
});

//Make sure that the RateView jsx page can even reder.
it('renders without crashing3', () => {
  render(<LoginForm />);
});

// Make sure the inputs exists
describe('<LoginForm >', function () {
  it('should have an input for the email', function () {
    let wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input')).to.have.length(1);
  });
});
