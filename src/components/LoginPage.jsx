import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';

class LoginPage extends Component {
  constructor(){
    super();
    this.makeQuery = this.makeQuery.bind(this);
  }
  makeQuery(){
    fetch('https://brilliant-fire-6778.firebaseio.com/Users.json').then((response) => {
      let obj = response.json();
      return obj;
    }).then((data)=>{
      console.log(data)

      this.setState({name: data.eddywang.name});
    });
  }
  makeNPMQuery(){
    database.ref().once("value").then(function(snapshot) {
      console.log(snapshot.toJSON());
    });
  }
  render() {
    return (
      <div className="LoginPage">
        <button onClick={this.makeNPMQuery}>Test button :)</button>
        <LoginForm/>
      </div>
    );
  }
}

export default LoginPage;
