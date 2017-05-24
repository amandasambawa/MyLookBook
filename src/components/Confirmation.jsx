import React, { Component } from 'react';
import "../styles/foundation.css";
import "../styles/Confirmation.css";

class Confirmation extends Component {

    constructor(){
        super();
        this.state = {
        }
    }


    render(){
        return(
            <div id="confirmationContainer">
                <img src= '../../assets/check-mark.png'/>
                <div id="confirmationText">Thanks for Rating!</div>
            </div>
        );
    }

}

export default Confirmation;
