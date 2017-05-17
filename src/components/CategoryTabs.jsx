import React, { Component } from 'react';
import { auth } from '../firebase.js';
import '../styles/CategoryTabs.css';
import BelowBox from "./BelowBox.jsx"
//import catalogItems from './outfitItems.json'

const itemsArray = {
    "tops": ["http://cdn.shopify.com/s/files/1/0194/3383/products/09_750_b6b49fe4-88d3-4118-a53a-9ecd3d118d20_grande.png?v=1465508934",
        "https://cdn.shopify.com/s/files/1/0152/3191/products/Half_Half_Half.OHHCHGHT17_1.png?v=1486050466",
        "http://cdn.shopify.com/s/files/1/1468/2506/products/Jerome_222_clipped_rev_1_grande.png?v=1478036057"],
    "bottoms": ["https://www.lammles.com/genthumb.php?w=225&src=/images/88MWZMN_5995-FTmain.png",
        "https://www.lammles.com/genthumb.php?w=225&src=/images/WRT20TB_5995-FNTmain.png",
        "https://www.lammles.com/genthumb.php?w=225&src=/images/47MWZPW_4994main.png"],
    "shoes": ["https://cdn.shopify.com/s/files/1/0684/4315/products/flightskool-air-jordan-4-thunder.png?v=1419128098",
        "https://cdn.shopify.com/s/files/1/0684/4315/products/FlighSkool-Air-Jordan-5-Fire-Red-GS.png?v=1417584078",
        "http://cdn.1001freedownloads.com/icon/thumb/390973/shoes-icon.png"],
    "accessories": ["https://cdn.shopify.com/s/files/1/0072/2092/products/layered_silver_necklaces_unique-jewellers-simple_necklace_triple_threat_fredrick_prince.png?v=1472620581",
        "https://cdn.shopify.com/s/files/1/0072/2092/products/Blue-Sapphire-sterling-silver-layered-necklace-unique-jewellers-st-christopher_main.png?v=1472619822",
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
        // this.isActive = this.isActive.bind(this);
        // this.returnCatalogItems = this.returnCatalogItems.bind(this);
    }

    setCategory(category) {
        let activeState = Object.assign({}, this.state.active);
        activeState[this.state.selected] = "default";
        activeState[category] = "active";
        this.setState({imageUrls: itemsArray[category], selected: category, active: activeState});
    }

    // isActive(value){
    //     if (value===this.state.selected)
    //         return 'active';
    //     else
    //         return 'default';
    // }

    // returnCatalogItems(){
    //     return this.state.imageUrls.map((url)=>{
    //         return (<img src={url}></img>);
    //     })
    // }

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
            <BelowBox imageUrls={this.state.imageUrls} getClickedItem={this.props.getClickedItem}/>
        </div>)
    }
}


export default CategoryTabs;
