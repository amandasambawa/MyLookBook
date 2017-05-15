import React, { Component } from 'react';
import { auth } from '../firebase.js';
import '../styles/CategoryTabs.css';

class CategoryTabs extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h2>Tabs Example</h2>
                <div className="categoryContainer">
                    <ul className = "tabs" data-tabs id = "tabs_example">
                        <li className = "tabs-title is-active"><a href = "#tab1">Tops</a></li>
                        <li className = "tabs-title"><a href = "#tab2">Bottoms</a></li>
                        <li className = "tabs-title"><a href = "#tab3">Shoes</a></li>
                        <li className = "tabs-title"><a href = "#tab4">Accessories</a></li>
                    </ul>

                    <div className = "tabs-content" data-tabs-content = "tabs_example">
                        <div className = "tabs-panel is-active" id = "tab1">
                            <p>Tops</p>
                        </div>

                        <div className = "tabs-panel" id = "tab2">
                            <p>Bottoms</p>
                        </div>

                        <div className = "tabs-panel" id = "tab3">
                            <p>Shoes</p>
                        </div>

                        <div className = "tabs-panel" id = "tab4">
                            <p>Accessories</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryTabs;
