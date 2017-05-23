import React, { Component } from 'react';
import "../styles/foundation.css";

class Confirmation extends Component {

    constructor(){
        super();
        this.state = {
        }
    }


    render(){
        return(
            <div>
                <img src= '../assets/check-mark.png'/>
                <span>Confirmed</span>
            </div>
        );
    }

}

export default Confirmation;