import React, { Component } from 'react';
import { auth, database } from '../firebase.js';

class SignUpForm extends Component {

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
    this.signUp = this.signUp.bind(this);

  }

  /*
  *  handles the email state
  */
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  /*
  *  handles the username state
  */
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  /*
  * handles the password state
  */
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

  render(){
    return(
      <div>
        <div className="formInputs columns small-14 small-offset-1" id="inputs">
          <input type="text" value={this.state.username} placeholder="Name" onChange={this.handleUsernameChange}/>
          <input type="text" value={this.state.email} placeholder="Email" onChange={this.handleEmailChange}/>
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
        </div>
        <div className="small-12 small-offset-2 loginButtons">
          <div className="row centered">
            <div onClick={this.signUp} className="button small-14 small-offset-1">Sign Up</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
