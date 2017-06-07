import React, {Component} from 'react';
import '../styles/CategoryTabs.css';
import BelowBox from "./BelowBox.jsx"
//import catalogItems from './outfitItems.json'

const itemsArray = {
    "tops": [
        {
            productId: 36734562,
            imgUrl: "https://storage.googleapis.com/productpoll-7127e.appspot.com/red%20dress.png",
            macysUrl: "https://www.macys.com/shop/product/under-armour-zinger-upf-30-golf-polo?ID=3054382&CategoryID=255#fn=sp%3D1%26spc%3D20%26ruleId%3D78|BA%26slotId%3D8%26kws%3Dunder%20armour%20polo%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 36101945,
            imgUrl: "http://cdn-tp1.mozu.com/6653-25789/cms/25789/files/dbeb19d3-5984-46a9-85dd-40b8e42c70b4?max=800",
            macysUrl: "https://www.macys.com/shop/product/the-north-face-denali-fleece-hoodie?ID=2712814&CategoryID=120#fn=sp%3D1%26spc%3D35%26ruleId%3D84%26slotId%3D5%26kws%3Dnorth%20face%20jacket%26searchPass%3DexactMultiMatch"
        }
    ],
    "bottoms": [
        {
            productId: 35449734,
            imgUrl: "https://fgl.scene7.com/is/image/FGLSportsLtd/332065540_01_a?wid=800&hei=800&bgColor=0,0,0,0&fmt=png-alpha&resMode=sharp2&op_sharpen=1",
            macysUrl: "https://www.macys.com/shop/product/nike-leg-a-see-just-do-it-dri-fit-leggings?ID=2353685&CategoryID=157&selectedSize=&swatchColor=Black/White#fn=sp%3D1%26spc%3D81%26ruleId%3D84%26slotId%3D30%26kws%3Dnike%20leggings%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 36937123,
            imgUrl: "https://cdn.shopify.com/s/files/1/0873/0770/products/BLACK_RIPPED_SKINNY_JEANS_-_NEW_LOOK_1024x1024.png?v=1436357302",
            macysUrl: "https://macys.com/shop/product/7-for-all-mankind-slim-illusion-skinny-jeans?ID=4460413&CategoryID=3111&LinkType=&selectedSize=#fn=sp%3D3%26spc%3D193%26ruleId%3D65%26slotId%3D168%26kws%3Ddistressed%20skinny%20jeans%26searchPass%3DexactMultiMatch"
        }
    ],
    "shoes": [
        {
            productId: 35486032,
            imgUrl: "https://cdn.shopify.com/s/files/1/0930/7298/products/830751-001-PHSRH000-2000_3611666778159049684_1024x1024.png?v=1489452882",
            macysUrl: "https://macys.com/shop/product/nike-womens-flex-2016-rn-running-sneakers-from-finish-line?ID=2745215"
        },
        {
            productId: 29615612,
            imgUrl: "https://cdn.shopify.com/s/files/1/1741/1799/products/keds_champion_oxford_sneakers_03_grande.png?v=1485443316",
            macysUrl: "https://macys.com/shop/product/keds-womens-champion-oxford-sneakers?ID=564801"
        },
        {
            productId: 36647549,
            imgUrl: "https://cdn.shopify.com/s/files/1/1429/9478/products/abbey-grape.png?v=1478098924",
            macysUrl: "https://macys.com/shop/product/aldo-falia-block-heel-pumps?ID=4745297"
        }
    ],
    "accessories": [
        {
            productId: 36352641,
            imgUrl: "https://cdn.shopify.com/s/files/1/0637/5325/products/14kt_Gold_Oval_Bangle_grande.png?v=1439057856",
            macysUrl: "https://macys.com/shop/product/polished-bangle-bracelet-in-18k-gold?ID=3004038"
        },
        {
            productId: 36434335,
            imgUrl: "https://cdn.shopify.com/s/files/1/1696/5433/products/mk_png_6_350x.png?v=1491323796",
            macysUrl: "https://www.macys.com/shop/product/michael-kors-womens-chronograph-vail-black-leather-strap-watch-38mm-mk2616?ID=2924017&CategoryID=23930&LinkType=&selectedSize=#fn=sp%3D6%26spc%3D238%26ruleId%3D78|BS%26slotId%3D238%26kws%3Dmichael%20kors%20watch%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 37215977,
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
                <BelowBox imageObj={this.state.imageObj}/>
            </div>
        )
    }
}

export default CategoryTabs;
