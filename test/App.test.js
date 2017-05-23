import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import App from '../src/components/App.jsx';


//Make sure that the App jsx page can even reder.
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

//Our state exists in the page and it updates.
it('renders without crashing part 2', () => {
  shallow(<App />);
});
