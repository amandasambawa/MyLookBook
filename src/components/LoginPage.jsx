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
    // this.makeQuery = this.makeQuery.bind(this);
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
  // makeQuery(){
  //   fetch('https://brilliant-fire-6778.firebaseio.com/Users.json').then((response) => {
  //     let obj = response.json();
  //     return obj;
  //   }).then((data)=>{
  //     console.log(data)
  //
  //     this.setState({name: data.eddywang.name});
  //   });
  // }
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
              <div className="columns small-6 small-offset-1 toggleTab" onClick={this.loginForm} >Login</div>
              <div className="columns small-6 small-offset-2 toggleTab" onClick={this.signUpForm} >Sign Up</div>
            </div>
            {this.innerForm()}
          </div>
        </div>
      );
    }
  }
}

export default LoginPage;
