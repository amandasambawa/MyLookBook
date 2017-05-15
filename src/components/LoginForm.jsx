import React, { Component } from 'react';
import { auth } from '../firebase.js';

class LoginForm extends Component {

  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.printLoginInfo = this.printLoginInfo.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  printLoginInfo(event){
    this.login(this.state.email, this.state.password);
  }

  signUp(){

  }

  login(email, password){
    console.log("running login flow");
    let outerError;
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      outerError = error;
      console.log("inside this function");
      var errorCode = error.code;
      var errorMessage = error.message;
      if (error){
        console.log("error ->", error.message);
      }else{
        console.log("successful login");
      }

      // ...
    });
    console.log(outerError);
  }

  logout(){
    auth.signOut().then(function() {
      console.log("successful log out")
      // Sign-out successful.
    }).catch(function(error) {
      console.log("error loggin out")
      // An error happened.
    });
  }

  render(){
    return(
      <div>
        <input type="text" value={this.state.email} onChange={this.handleUsernameChange}/>
        <input type="password" onChange={this.handlePasswordChange}/>
        <input type="submit" value="Submit" onClick={this.printLoginInfo} />
        <button onClick={this.logout} className="button">Logout</button>
        <h1>{this.state.username}</h1>
      </div>
    );
  }

}

export default LoginForm;
