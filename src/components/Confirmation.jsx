import React, { Component } from 'react';
import "../styles/foundation.css";
import "../styles/Confirmation.css";
import {Link} from 'react-router-dom';

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
                <div id="confirmationText">Thanks for rating!</div>
                <div id="createOutfitLink">
                    <h4>Start creating your outfits now:</h4>
                    <Link to="/outfitCreation" id='confirmationCreateButton' className="button">Create Outfit</Link>
                </div>
            </div>
        );
    }

}

export default Confirmation;
