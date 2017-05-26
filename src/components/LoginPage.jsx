import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import { database } from '../firebase.js';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
  constructor(){
    super();
    this.state = {
      tab: "login"
    }
    this.innerForm = this.innerForm.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.signUpForm = this.signUpForm.bind(this);
  }

  innerForm(){
    if(this.state.tab === "login"){
      return <LoginForm/>;
    }else{
      return <SignUpForm/>;
    }
  }

  loginForm(){
    this.setState({tab: "login"});
  }

  signUpForm(){
    this.setState({tab: "signUp"});
  }

  render() {
    if (this.props.uid){
      return (
      <Redirect to="/feed"/>
      )
    } else {
      return (
        <div className="loginPage row">
          <div className="loginForm columns small-14 small-offset-1">
            <div className="row">
              <div role="button" className="columns small-6 small-offset-1 toggleTab" onClick={this.loginForm} >Login</div>
              <div role="button" className="columns small-6 small-offset-2 toggleTab" onClick={this.signUpForm} >Sign Up</div>
            </div>
            {this.innerForm()}
          </div>
        </div>
      );
    }
  }
}

export default LoginPage;
