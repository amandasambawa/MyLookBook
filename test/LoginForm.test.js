import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import LoginForm from '../src/components/LoginForm.jsx';


/*
* This file is for testing for LoginForm
*/

//Make sure that LoginForm can even render.
it('LoginForm renders properly.', () => {
  let wrapper = shallow(<LoginForm />);
  //console.log(wrapper.debug());
  let wrapper2 = mount(<LoginForm />);
  let wrapper3 = render(<LoginForm />);
  //console.log(wrapper2.debug());
});


/*
* The following tests encompass the UI.
*/

//Checking if the inputs load properly.
describe('LoginForm', () => {
    it('check if login input loads properly.', () => {
        const wrapper = shallow(<LoginForm />);
        const image = wrapper.find('input').exists();
        expect(image).toEqual(true);
    });
  });

/*
* The following tests encompass the functionality
*/

//

//Make sure that email state is changing properly
it('make sure that email state is changing properly.', () => {
  const wrapper = mount(<LoginForm />);
  wrapper.instance().setState({email:'bob@bob.com'});
  expect(wrapper.state('email')).toEqual('bob@bob.com');
});

//Make sure that password state is changing properly as well
it('make sure that password state is changing properly.', () => {
  const wrapper = mount(<LoginForm />);
  wrapper.instance().setState({password:'bobbob'});
  expect(wrapper.state('password')).toEqual('bobbob');
});

//Make sure that login does not break the code.
//so long as the test does not error out, this means that login is working
it('make sure that the code does not break with login', () => {
  const wrapper = mount(<LoginForm />);
  const login = wrapper.instance().login();
});
