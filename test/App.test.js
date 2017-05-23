import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
// import {shallow} from 'react-test-renderer'
import RateView from '../src/components/RateView.jsx';
import LoginForm from '../src/components/LoginForm.jsx';
import Feed from '../src/components/Feed.jsx';
import Rate from 'rc-rate';
import { Link } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginForm />, div);
});

it('renders Title of the page', () => {
 const wrapper = shallow(<RateView />);
 const title = <h1>RateView</h1>;
 // expect(wrapper.contains(welcome)).to.equal(true);
 expect(wrapper.contains(title)).toEqual(true);
});

describe('<LoginForm >', () => {
 it('should have an input for the email', () => {
   let wrapper = shallow(<Feed uid={123}/>);
   expect(wrapper.find('input')).to.have.length(1);
 });
});
