import React, { Component } from 'react';
import { auth } from '../firebase.js';
import '../styles/CategoryTabs.css';
import BelowBox from "./BelowBox.jsx"
//import catalogItems from './outfitItems.json'

const itemsArray = {
    "tops": ["http://cdn.shopify.com/s/files/1/0194/3383/products/09_750_b6b49fe4-88d3-4118-a53a-9ecd3d118d20_grande.png?v=1465508934",
        "https://cdn.shopify.com/s/files/1/0152/3191/products/Half_Half_Half.OHHCHGHT17_1.png?v=1486050466",
        "http://cdn.shopify.com/s/files/1/1468/2506/products/Jerome_222_clipped_rev_1_grande.png?v=1478036057",
        "http://cdn.shopify.com/s/files/1/0194/3383/products/09_750_b6b49fe4-88d3-4118-a53a-9ecd3d118d20_grande.png?v=1465508934",
        "https://cdn.shopify.com/s/files/1/0152/3191/products/Half_Half_Half.OHHCHGHT17_1.png?v=1486050466",
        "http://cdn.shopify.com/s/files/1/1468/2506/products/Jerome_222_clipped_rev_1_grande.png?v=1478036057"],
    "bottoms": ["http://cdn.shopify.com/s/files/1/0641/8829/products/blacksweatpants_grande.png?v=1418952378",
        "https://cdn.shopify.com/s/files/1/0250/2544/products/Wheat-Oct-59_large.png?v=1478210389"],
    "shoes": ["https://cdn.shopify.com/s/files/1/0684/4315/products/flightskool-air-jordan-4-thunder.png?v=1419128098",
        "https://cdn.shopify.com/s/files/1/0684/4315/products/FlighSkool-Air-Jordan-5-Fire-Red-GS.png?v=1417584078"],
    "accessories": ["https://cdn.shopify.com/s/files/1/0253/1409/products/solid-purple-SFS001-8-no-background.png?v=1477753315",
        "https://cdn.shopify.com/s/files/1/1286/1781/products/Hammered-Bangle-Bracelet-Rose-Gold-Plated.png?v=1482398239",
        "https://cdn.shopify.com/s/files/1/0104/9632/products/cast-of-vices-ups-and-downs-necklace-ud006.png?v=1328383261",
        "https://cdn.shopify.com/s/files/1/0253/1409/products/solid-purple-SFS001-8-no-background.png?v=1477753315",
        "https://cdn.shopify.com/s/files/1/1286/1781/products/Hammered-Bangle-Bracelet-Rose-Gold-Plated.png?v=1482398239",
        "https://cdn.shopify.com/s/files/1/0104/9632/products/cast-of-vices-ups-and-downs-necklace-ud006.png?v=1328383261"]

};

class CategoryTabs extends Component {
    constructor(){
        super();
        this.state = {
            selected:'tops',
            imageUrls: itemsArray.tops,
            active: {
              "tops": "active",
              "bottoms": "default",
              "shoes": "default",
              "accessories": "default"
            }
        };
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(category) {
        let activeState = Object.assign({}, this.state.active);
        activeState[this.state.selected] = "default";
        activeState[category] = "active";
        this.setState({imageUrls: itemsArray[category], selected: category, active: activeState});
    }

    render() {
    return (
        <div>
            <div className="flex-container">
                <div className={'flex-item item1 btn ' + this.state.active.tops} onClick={() => this.setCategory('tops')}  onTouchStart={() => this.setCategory('tops')}>
                    Tops
                </div>
                <div className={'flex-item item2 btn ' + this.state.active.bottoms} onClick={() => this.setCategory('bottoms')}  onTouchStart={() => this.setCategory('bottoms')}>
                    Bottoms
                </div>
                <div className={'flex-item item3 btn ' + this.state.active.shoes} onClick={() => this.setCategory('shoes')}  onTouchStart={() => this.setCategory('shoes')}>
                    Shoes
                </div>
                <div className={'flex-item item4 btn ' + this.state.active.accessories} onClick={() => this.setCategory('accessories')}  onTouchStart={() => this.setCategory('accessories')}>
                    Accessories
                </div>
            </div>
                <BelowBox imageUrls={this.state.imageUrls} />
        </div>)
    }
}


export default CategoryTabs;
