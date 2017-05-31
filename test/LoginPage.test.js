import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import LoginPage from '../src/components/LoginPage.jsx';



/*
* This test file is for SignUpForm
*/



//Make sure that LoginPage is rendering properly.
it('LoginPage renders properly.', () => {
  const wrapper = shallow(<LoginPage />);
  const wrapper2 = mount(<LoginPage />);
});



/*
* These tests encompass the UI
*/

//make sure that the divs are loaded up
describe('LoginPage', () => {
    it('check if the divs are loading up', () => {
        const wrapper = shallow(<LoginPage />);
        const div = wrapper.find('div').exists();
        expect(div).toEqual(true);
    });
  });


/*
* These tests encompass the functionality
*/


//make sure the Loginpage loginFormTab is working fine
describe('LoginPage', () => {
    it('check if loginFormTab is working properly.', () => {
        const wrapper = shallow(<LoginPage />);
        wrapper.instance().loginForm();
        expect(wrapper.state('tab')).toEqual("login");
    });
  });


//make sure the Loginpage signUpFormTab is working fine
describe('LoginPage', () => {
    it('check if signUpTab is working properly.', () => {
        const wrapper = shallow(<LoginPage />);
        wrapper.instance().signUpForm();
        expect(wrapper.state('tab')).toEqual("signUp");
    });
  });

//make sure the Loginpage innerForm is working fine
//should not cause an error because now we have a state for the instance to
//create a new component. No error means this test passes.
describe('LoginPage', () => {
    it('check if innerForm is working properly.', () => {
        const wrapper = shallow(<LoginPage />);
        wrapper.instance().signUpForm();
        wrapper.instance().innerForm();
    });
  });
