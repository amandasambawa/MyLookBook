import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import SignUpForm from '../src/components/SignUpForm.jsx';



/*
* This test file is for SignUpForm
*/

//Make sure that SignUpForm is rendering properly.
it('SignUpForm renders properly.', () => {
  const wrapper = shallow(<SignUpForm />);
  const wrapper2 = mount(<SignUpForm />);
});


/*
* The following tests encompass the UI.
*/

//make sure that input boxes are loaded up
describe('SignUpForm', () => {
    it('check if the input boxes are loading up', () => {
        const wrapper = shallow(<SignUpForm />);
        const input = wrapper.find('input').exists();
        expect(input).toEqual(true);
    });
  });

/*
* The following tests encompass the functionality.
*/

//Make sure SignUpForm is changing the username state properly.
it('make sure that SignUpForm Username is working properly', () => {
  const wrapper = shallow(<SignUpForm />);
  wrapper.instance().setState({username:'testing!'});
  expect(wrapper.state('username')).toEqual('testing!');
});

//Make sure SignUpForm is changing the email state properly.
it('make sure that SignUpForm email is working properly', () => {
  const wrapper = shallow(<SignUpForm />);
  wrapper.instance().setState({email:'test@test.com'});
  expect(wrapper.state('email')).toEqual('test@test.com');
});

//Make sure SignUpForm is changing the password state properly.
it('make sure that SignUpForm password is working properly', () => {
  const wrapper = shallow(<SignUpForm />);
  wrapper.instance().setState({password:'password'});
  expect(wrapper.state('password')).toEqual('password');
});


//Make sure that sign up doesn't crash the code. It doesn't actually send to
//DB since we don't establish the link in our test.
it('make sure that signup does not crash properly', () => {
  const wrapper = shallow(<SignUpForm />);
  wrapper.instance().setState({email:'test@test.com'});
  wrapper.instance().setState({password:'password'});
  wrapper.instance().signUp();
});
