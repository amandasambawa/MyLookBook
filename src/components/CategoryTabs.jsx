import React, {Component} from 'react';
import {auth} from '../firebase.js';
import '../styles/CategoryTabs.css';
import BelowBox from "./BelowBox.jsx"
//import catalogItems from './outfitItems.json'

const itemsArray = {
    "tops": [
        {
            productId: 3054382,
            imgUrl: "http://cdn.allvolleyball.com/images/uploads/category_127_7336.png",
            macysUrl: "https://www.macys.com/shop/product/under-armour-zinger-upf-30-golf-polo?ID=3054382&CategoryID=255#fn=sp%3D1%26spc%3D20%26ruleId%3D78|BA%26slotId%3D8%26kws%3Dunder%20armour%20polo%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 2712814,
            imgUrl: "http://cdn-tp1.mozu.com/6653-25789/cms/25789/files/dbeb19d3-5984-46a9-85dd-40b8e42c70b4?max=800",
            macysUrl: "https://www.macys.com/shop/product/the-north-face-denali-fleece-hoodie?ID=2712814&CategoryID=120#fn=sp%3D1%26spc%3D35%26ruleId%3D84%26slotId%3D5%26kws%3Dnorth%20face%20jacket%26searchPass%3DexactMultiMatch"
        }
    ],
    "bottoms": [
        {
            productId: 2353685,
            imgUrl: "https://fgl.scene7.com/is/image/FGLSportsLtd/332065540_01_a?wid=800&hei=800&bgColor=0,0,0,0&fmt=png-alpha&resMode=sharp2&op_sharpen=1",
            macysUrl: "https://www.macys.com/shop/product/nike-leg-a-see-just-do-it-dri-fit-leggings?ID=2353685&CategoryID=157&selectedSize=&swatchColor=Black/White#fn=sp%3D1%26spc%3D81%26ruleId%3D84%26slotId%3D30%26kws%3Dnike%20leggings%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 4460413,
            imgUrl: "https://cdn.shopify.com/s/files/1/0873/0770/products/BLACK_RIPPED_SKINNY_JEANS_-_NEW_LOOK_1024x1024.png?v=1436357302",
            macysUrl: "https://macys.com/shop/product/7-for-all-mankind-slim-illusion-skinny-jeans?ID=4460413&CategoryID=3111&LinkType=&selectedSize=#fn=sp%3D3%26spc%3D193%26ruleId%3D65%26slotId%3D168%26kws%3Ddistressed%20skinny%20jeans%26searchPass%3DexactMultiMatch"
        }
    ],
    "shoes": [
        {
            productId: 4364902,
            imgUrl: "http://render.nikeid.com/ir/render/nikeidrender/roshetwo1608_v3?obj=/s/shadow/shad&show&color=000000&obj=/s/g8&color=141414&show&obj=/s/g22&color=141414&show&obj=/s/g9&color=bcbdbd&show&obj=/s/g7&color=141414&show&obj=/s/g10&color=535559&show&obj=/s/g11&color=62646a&show&obj=/s/g14&color=141414&show&obj=/s/g15&color=141414&show&obj=/s/g17&color=1d1c1b&show&obj=/s/g1/solid&color=141414&show&obj=/s/g4/solid&color=141414&show&obj=/s/g20&color=141414&show&obj=/s/g21&color=ebff67&show&obj=/s/g12/solid&color=141414&show&obj=/s&req=object&fmt=png-alpha&wid=640",
            macysUrl: "https://macys.com/shop/product/nike-womens-roshe-two-casual-sneakers-from-finish-line?ID=4364902&CategoryID=63268#fn=sp%3D1%26spc%3D31%26ruleId%3D84%26slotId%3D6%26kws%3Dnike%20roshe%26searchPass%3DallMultiMatchWithSpelling"
        },
        {
            productId: 564801,
            imgUrl: "https://cdn.shopify.com/s/files/1/1741/1799/products/keds_champion_oxford_sneakers_03_grande.png?v=1485443316",
            macysUrl: "https://macys.com/shop/product/keds-womens-champion-oxford-sneakers?ID=564801"
        },
        {
            productId: 4745297,
            imgUrl: "https://cdn.shopify.com/s/files/1/1429/9478/products/abbey-grape.png?v=1478098924",
            macysUrl: "https://macys.com/shop/product/aldo-falia-block-heel-pumps?ID=4745297"
        }
    ],
    "accessories": [
        {
            productId: 3004038,
            imgUrl: "https://cdn.shopify.com/s/files/1/0637/5325/products/14kt_Gold_Oval_Bangle_grande.png?v=1439057856",
            macysUrl: "https://macys.com/shop/product/polished-bangle-bracelet-in-18k-gold?ID=3004038"
        },
        {
            productId: 2924017,
            imgUrl: "https://cdn.shopify.com/s/files/1/1696/5433/products/mk_png_6_350x.png?v=1491323796",
            macysUrl: "https://www.macys.com/shop/product/michael-kors-womens-chronograph-vail-black-leather-strap-watch-38mm-mk2616?ID=2924017&CategoryID=23930&LinkType=&selectedSize=#fn=sp%3D6%26spc%3D238%26ruleId%3D78|BS%26slotId%3D238%26kws%3Dmichael%20kors%20watch%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 4673904,
            imgUrl: "https://cdn.ivizi.nl/images/product-carousel-lightbox/2e01840f-fee1-43e4-bcc2-78f9adb00a21.png",
            macysUrl: "https://www.macys.com/shop/product/apple-watch-series-1-42mm-rose-gold-aluminum-case-with-pink-sand-sport-band?ID=4673904&CategoryID=101043#fn=sp%3D1%26spc%3D26%26ruleId%3D105|BS%26slotId%3D22"
        }
    ]
};

class CategoryTabs extends Component {
    constructor() {
        super();
        this.state = {
            selected: 'tops',
            imageObj: itemsArray.tops,
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
        this.setState({imageObj: itemsArray[category], selected: category, active: activeState});
        //console.log("imageObj: ",this.state.imageObj);
    }

    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className={'flex-item item1 btn ' + this.state.active.tops}
                         onClick={() => this.setCategory('tops')} onTouchStart={() => this.setCategory('tops')}>
                        Tops
                    </div>
                    <div className={'flex-item item2 btn ' + this.state.active.bottoms}
                         onClick={() => this.setCategory('bottoms')} onTouchStart={() => this.setCategory('bottoms')}>
                        Bottoms
                    </div>
                    <div className={'flex-item item3 btn ' + this.state.active.shoes}
                         onClick={() => this.setCategory('shoes')} onTouchStart={() => this.setCategory('shoes')}>
                        Shoes
                    </div>
                    <div className={'flex-item item4 btn ' + this.state.active.accessories}
                         onClick={() => this.setCategory('accessories')}
                         onTouchStart={() => this.setCategory('accessories')}>
                        Accessories
                    </div>
                </div>
                <BelowBox imageObj={this.state.imageObj} getClickedItem={this.props.getClickedItem}/>
            </div>
        )
    }
}

export default CategoryTabs;
