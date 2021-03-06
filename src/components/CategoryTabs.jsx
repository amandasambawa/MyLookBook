import React, {Component} from 'react';
import '../styles/CategoryTabs.css';
import BelowBox from "./BelowBox.jsx"
//import catalogItems from './outfitItems.json'

const itemsArray = {
    "tops": [
        {
            productId: 37331554,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/top_striped.png?alt=media&token=c1b5ea91-724b-4d0b-95ac-383bed724208",
            macysUrl: "https://www.macys.com/shop/product/polo-ralph-lauren-striped-cotton-t-shirt?ID=4701909&CategoryID=85842&LinkType=&selectedSize=#fn=BRAND%3DPolo Ralph Lauren;;Weekend Max Mara%26sp%3D1%26spc%3D268%26ruleId%3D64|BS%26slotId%3D8"
        },
        {
            productId: 37331559,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/top_americanflag.png?alt=media&token=ed369d44-dfdc-4c64-a9e8-c7ef3833037a",
            macysUrl: "https://www.macys.com/shop/product/polo-ralph-lauren-graphic-print-cotton-t-shirt?ID=4701913&CategoryID=85842#fn=BRAND%3DPolo Ralph Lauren%26sp%3D1%26spc%3D169%26ruleId%3D64|BS%26slotId%3D14"
        },
        {
            productId: 37116205,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/top_buttonup.gif?alt=media&token=b801bab9-9811-498c-bb4c-4a5fbe8cc3fe",
            macysUrl: "https://www.macys.com/shop/product/polo-ralph-lauren-relaxed-fit-striped-linen-shirt?ID=4578139&CategoryID=85842&selectedSize=#fn=BRAND%3DPolo Ralph Lauren%26sp%3D1%26spc%3D169%26ruleId%3D64|BS%26slotId%3D43'"
        },
        {
            productId: 37198301,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/top_lightblue.png?alt=media&token=4b9a8d92-f7f6-4b23-ac55-e21f27d36ab4",
            macysUrl: "https://m.macys.com/shop/product/polo-ralph-lauren-striped-off-the-shoulder-cotton-dress?ID=4646313&CategoryID=85842&LinkType=&selectedSize=#fn=BRAND%3DPolo Ralph Lauren%26sp%3D1%26spc%3D169%26ruleId%3D64|BS%26slotId%3D64"
        }
    ],
    "bottoms": [
        {
            productId: 36852885,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/tompkins-jeans.png?alt=media&token=41a7bde5-5e98-4e9a-8198-24615b87d545",
            macysUrl: "https://macys.com/shop/product/polo-ralph-lauren-tompkins-skinny-jeans?ID=4412138"
        },
        {
            productId: 37298790,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/blue-shorts.png?alt=media&token=da2dc63c-3d35-41a1-b18c-679b44662395",
            macysUrl: "https://macys.com/shop/product/lauren-ralph-lauren-twill-cotton-shorts?ID=4695308"
        },
        {
            productId: 37289611,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/bottom_jeanshorts.png?alt=media&token=8938cd28-ef29-4fc0-be4b-99c5e4a7124d",
            macysUrl: "https://www.macys.com/shop/product/tommy-hilfiger-cuffed-shorts-only-at-macys?ID=4075810&CategoryID=5344&selectedSize=#fn=BRAND%3DTommy Hilfiger%26sp%3D1%26spc%3D13%26ruleId%3D78|BS|BA%26slotId%3D2"
        }
    ],
    "shoes": [
        {
            productId: 36860997,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/rose-sandals.png?alt=media&token=e72dd72b-e7b3-459e-9f16-9f195a3d30c4",
            macysUrl: "https://macys.com/shop/product/kate-spade-new-york-colombus-sandals?ID=3017947"
        },
        {
            productId: 33625902,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/bow-sandal.png?alt=media&token=e45ad3b0-4825-4d51-a848-3615d54ac913",
            macysUrl: "https://macys.com/shop/product/inc-international-concepts-malissa-rhinestone-bow-flat-sandals-only-at-macys?ID=1856629&CategoryID=17570"
        },
        {
            productId: 37075367,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/pom-sandals.png?alt=media&token=42188004-3061-4e05-9e2c-1e056d65118e",
            macysUrl: "https://macys.com/shop/product/vince-camuto-balisa-pom-pom-lace-up-sandals?ID=4503608"
        },
        {
            productId: 29615612,
            imgUrl: "https://cdn.shopify.com/s/files/1/1741/1799/products/keds_champion_oxford_sneakers_03_grande.png?v=1485443316",
            macysUrl: "https://macys.com/shop/product/keds-womens-champion-oxford-sneakers?ID=564801"
        },
        {
            productId: 35486032,
            imgUrl: "https://cdn.shopify.com/s/files/1/0930/7298/products/830751-001-PHSRH000-2000_3611666778159049684_1024x1024.png?v=1489452882",
            macysUrl: "https://macys.com/shop/product/nike-womens-flex-2016-rn-running-sneakers-from-finish-line?ID=2745215"
        }
    ],
    "accessories": [
        {
            productId: 37148962,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/blue-necklace.png?alt=media&token=19b25520-bd0e-4551-8d85-df25dfa6d6c1",
            macysUrl: "https://www.macys.com/shop/product/inc-international-concepts-gold-tone-blue-stone-statement-necklace-only-at-macys?ID=4626844&CategoryID=55285#fn=sp%3D1%26spc%3D505%26ruleId%3D76%26slotId%3D31%26kws%3Dstatement%20necklaces%26searchPass%3DexactMultiMatch"
        },
        {
            productId: 37174791,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/cactus-bangle.png?alt=media&token=c23d0bc5-f855-45dd-b689-bef6ca36936b",
            macysUrl: "https://www.macys.com/shop/product/kate-spade-new-york-gold-tone-green-cactus-hinged-bangle-bracelet?ID=4642354&EFCKEY=%7B%22EXPERIMENT%22%3A%5B%222207%22%2C%222369%22%2C%222554%22%2C%222421%22%2C%222244%22%2C%222243%22%5D%7D&SEED=6326518645196919271"
        },
        {
            productId: 36483888,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/apple-watch.png?alt=media&token=b368d5ca-098c-49fc-8d40-0bb8f55c474d",
            macysUrl: "https://macys.com/shop/product/apple-watch-series-1-38mm-rose-gold-tone-aluminum-case-with-pink-sand-sport-band?ID=3197614&CategoryID=101043"
        },
        {
            productId: 36770842,
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/productpoll-7127e.appspot.com/o/blue-purse.png?alt=media&token=a5824064-efb0-4b51-bdd3-80b1a28fecc7",
            macysUrl: "https://macys.com/shop/product/kate-spade-new-york-cameron-street-arielle-mini-crossbody?ID=4368981&CategoryID=26846#fn=sp%3D1%26spc%3D1266%26ruleId%3D60%26slotId%3D10%26kws%3Dkate%20spade%20new%20york%26searchPass%3DexactMultiMatch"
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
