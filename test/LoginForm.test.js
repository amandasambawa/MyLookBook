import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import LoginForm from '../src/components/LoginForm.jsx';


// Make sure the inputs exists
describe('<LoginForm >', function () {
  it('should have an input for the email', function () {
    let wrapper = mount(<LoginForm />);
  });
});
