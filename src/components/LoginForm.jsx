import React, { Component } from 'react';
import { auth, database } from '../firebase.js';

class LoginForm extends Component {

  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.login = this.login.bind(this);
  }

  /*
  * Saving email state
  */
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }


  /*
  * Saving password states
  */
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
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
      <div>
        <div className="formInputs columns small-14 small-offset-1" id="inputs">
          <input type="text" value={this.state.email} placeholder="Email" onChange={this.handleEmailChange}/>
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
        </div>
        <div className="small-12 small-offset-2 loginButtons">
          <div className="row centered">
            <div onClick={this.login} className="button small-14 small-offset-1">Login</div>
          </div>
        </div>
     </div>
    );
  }
}

export default LoginForm;
