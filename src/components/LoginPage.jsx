import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import { database } from '../firebase.js';
import { Redirect } from 'react-router-dom';

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
    if (this.props.uid){
      return (
      <Redirect to="/feed"/>
      )
    } else {
      return (
        <div className="LoginPage">
          <LoginForm/>
        </div>
      );
    }
  }
}

export default LoginPage;
