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
                <img src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Check_mark_23x20_02.svg/1081px-Check_mark_23x20_02.svg.png'/>
                <span>Confirmed</span>
            </div>
        );
    }

}

export default Confirmation;