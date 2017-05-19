import React, { Component } from 'react';
import { auth, database } from '../firebase.js';

class LoginForm extends Component {

  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      username: ""
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);

  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  signUp(){
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      let userRef = database.ref(`/users/${user.uid}`);
      userRef.set({
        username: this.state.username
      });
    }).catch((error, user)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      if (error){
        console.log("error ->", error.message);
      }else{
        console.log("signing up");
      }
    });
  }

  login(){
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (error){
        console.log("error ->", error.message);
      }else{
        console.log("successful login");
      }
    });
  }

  render(){
    return(
      <div className="loginForm row">
        <input type="text" className="small-12 small-offset-2" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange}/>
        <input type="text" className="small-12 small-offset-2" value={this.state.email} placeholder="Email" onChange={this.handleEmailChange}/>
        <input type="password" className="small-12 small-offset-2" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
        <button onClick={this.login} className="button columns small-6 small-offset-2">Login</button>
        <button onClick={this.signUp} className="button columns small-6">Sign Up</button>
      </div>
    );
  }
}

export default LoginForm;
