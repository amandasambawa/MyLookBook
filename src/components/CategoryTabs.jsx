import React, { Component } from 'react';
import { auth } from '../firebase.js';
import '../styles/CategoryTabs.css';

var isActive = {
    backgroundColor: 'lightgrey'
};
var inactive = {
    backgroundColor: 'white'
};
class CategoryTabs extends Component {

    constructor() {
        super();
        this.state = {
              tops: "light-grey",
              bottoms: "white",
              shoes: "white",
              accessories: "white"
        };
        this.clickTops = this.clickTops.bind(this);
    }

    clickTops() {
        console.log("tops clicked");
        this.setState(
            {
                currentActive: "tops",
                styles: {
                    tops: "active",
                    bottoms: "inactive",
                    shoes: "inactive",
                    accessories: "inactive"

                }
            }
        );
    }


    clickBottoms() {
        this.setState({
            currentActive: "bottoms",
        })
    }
    clickShoes() {
        console.log("shoes clicked");
    }
    clickAccessories() {
        console.log("accessories clicked");
    }

    render() {
        return(
            <div>
                <div className="flex-container">
                    <div onClick={this.clickTops} style={ {backgroundColor:this.state.tops} } className="flex-item item1">Tops</div>
                    <div onClick={this.clickBottoms} style={ {backgroundColor:this.state.bottoms} } className="flex-item item2">Bottom</div>
                    <div onClick={this.clickShoes} style={ {backgroundColor:this.state.shoes} } className="flex-item item3">Shoes</div>
                    <div onClick={this.clickAccessories} style={ {backgroundColor:this.state.accessories} } className="flex-item item4">Accessories</div>
                </div>
            </div>
        );
    }
}

export default CategoryTabs;
