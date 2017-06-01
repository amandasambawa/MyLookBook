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
          productId: 2353685,
          imgUrl: "https://fgl.scene7.com/is/image/FGLSportsLtd/332065540_01_a?wid=800&hei=800&bgColor=0,0,0,0&fmt=png-alpha&resMode=sharp2&op_sharpen=1",
          macysUrl: "https://www.macys.com/shop/product/nike-leg-a-see-just-do-it-dri-fit-leggings?ID=2353685&CategoryID=157&selectedSize=&swatchColor=Black/White#fn=sp%3D1%26spc%3D81%26ruleId%3D84%26slotId%3D30%26kws%3Dnike%20leggings%26searchPass%3DexactMultiMatch"
      }
  ],
  "bottoms": [
    {
      productId: 2353685,
      imgUrl: "https://fgl.scene7.com/is/image/FGLSportsLtd/332065540_01_a?wid=800&hei=800&bgColor=0,0,0,0&fmt=png-alpha&resMode=sharp2&op_sharpen=1",
      macysUrl: "https://www.macys.com/shop/product/nike-leg-a-see-just-do-it-dri-fit-leggings?ID=2353685&CategoryID=157&selectedSize=&swatchColor=Black/White#fn=sp%3D1%26spc%3D81%26ruleId%3D84%26slotId%3D30%26kws%3Dnike%20leggings%26searchPass%3DexactMultiMatch"
    }
  ],
  "shoes": [
    {
      productId: 4364902,
      imgUrl: "http://render.nikeid.com/ir/render/nikeidrender/roshetwo1608_v1?obj=/s/shadow/shad&show&color=000000&obj=/s/g8&color=141414&show&obj=/s/g22&color=141414&show&obj=/s/g9&color=bcbdbd&show&obj=/s/g7&color=141414&show&obj=/s/g10&color=535559&show&obj=/s/g11&color=62646a&show&obj=/s/g14&color=141414&show&obj=/s/g15&color=141414&show&obj=/s/g17&color=1d1c1b&show&obj=/s/g1/solid&color=141414&show&obj=/s/g4/solid&color=141414&show&obj=/s/g20&color=141414&show&obj=/s/g21&color=ebff67&show&obj=/s/g12/solid&color=141414&show&obj=/s&req=object&fmt=png-alpha&wid=640",
      macysUrl: "https://macys.com/shop/product/nike-womens-roshe-two-casual-sneakers-from-finish-line?ID=4364902&CategoryID=63268#fn=sp%3D1%26spc%3D31%26ruleId%3D84%26slotId%3D6%26kws%3Dnike%20roshe%26searchPass%3DallMultiMatchWithSpelling"
    },
    {
        productId: 564801,
        imgUrl: "https://cdn.shopify.com/s/files/1/1741/1799/products/keds_champion_oxford_sneakers_03_grande.png?v=1485443316",
        macysUrl: "https://macys.com/shop/product/keds-womens-champion-oxford-sneakers?ID=564801"
    }

  ],
  "accessories": [
    {
      productId: 3004038,
      imgUrl: "https://cdn.shopify.com/s/files/1/0637/5325/products/14kt_Gold_Oval_Bangle_grande.png?v=1439057856",
      macysUrl: "https://macys.com/shop/product/polished-bangle-bracelet-in-18k-gold?ID=3004038"
    }
  ]

  // "tops": ["http://cdn.shopify.com/s/files/1/0194/3383/products/09_750_b6b49fe4-88d3-4118-a53a-9ecd3d118d20_grande.png?v=1465508934",
  //     "https://cdn.shopify.com/s/files/1/0152/3191/products/Half_Half_Half.OHHCHGHT17_1.png?v=1486050466",
  //     "http://cdn.shopify.com/s/files/1/1468/2506/products/Jerome_222_clipped_rev_1_grande.png?v=1478036057",
  //     "http://cdn.shopify.com/s/files/1/0194/3383/products/09_750_b6b49fe4-88d3-4118-a53a-9ecd3d118d20_grande.png?v=1465508934",
  //     "https://cdn.shopify.com/s/files/1/0152/3191/products/Half_Half_Half.OHHCHGHT17_1.png?v=1486050466",
  //     "http://cdn.shopify.com/s/files/1/1468/2506/products/Jerome_222_clipped_rev_1_grande.png?v=1478036057"],
  // "bottoms": ["http://cdn.shopify.com/s/files/1/0641/8829/products/blacksweatpants_grande.png?v=1418952378",
  //     "https://cdn.shopify.com/s/files/1/0250/2544/products/Wheat-Oct-59_large.png?v=1478210389"],
  // "shoes": ["https://cdn.shopify.com/s/files/1/0684/4315/products/flightskool-air-jordan-4-thunder.png?v=1419128098",
  //     "https://cdn.shopify.com/s/files/1/0684/4315/products/FlighSkool-Air-Jordan-5-Fire-Red-GS.png?v=1417584078"],
  // "accessories": ["https://cdn.shopify.com/s/files/1/0253/1409/products/solid-purple-SFS001-8-no-background.png?v=1477753315",
  //     "https://cdn.shopify.com/s/files/1/1286/1781/products/Hammered-Bangle-Bracelet-Rose-Gold-Plated.png?v=1482398239",
  //     "https://cdn.shopify.com/s/files/1/0104/9632/products/cast-of-vices-ups-and-downs-necklace-ud006.png?v=1328383261",
  //     "https://cdn.shopify.com/s/files/1/0253/1409/products/solid-purple-SFS001-8-no-background.png?v=1477753315",
  //     "https://cdn.shopify.com/s/files/1/1286/1781/products/Hammered-Bangle-Bracelet-Rose-Gold-Plated.png?v=1482398239",
  //     "https://cdn.shopify.com/s/files/1/0104/9632/products/cast-of-vices-ups-and-downs-necklace-ud006.png?v=1328383261"]

};

class CategoryTabs extends Component {
  constructor() {
    super();
    this.state = {
      selected: 'tops',
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
    this.setState({imageUrls: itemsArray[category.imgUrl], selected: category, active: activeState});
    console.log("imageUrls: ",this.state.imageUrls);
  }

  render() {
    return (
      <div>
        <div className="flex-container">
          <div className={'flex-item item1 btn ' + this.state.active.tops} onClick={() => this.setCategory('tops')} onTouchStart={() => this.setCategory('tops')}>
            Tops
          </div>
          <div className={'flex-item item2 btn ' + this.state.active.bottoms} onClick={() => this.setCategory('bottoms')} onTouchStart={() => this.setCategory('bottoms')}>
            Bottoms
          </div>
          <div className={'flex-item item3 btn ' + this.state.active.shoes} onClick={() => this.setCategory('shoes')} onTouchStart={() => this.setCategory('shoes')}>
            Shoes
          </div>
          <div className={'flex-item item4 btn ' + this.state.active.accessories} onClick={() => this.setCategory('accessories')} onTouchStart={() => this.setCategory('accessories')}>
            Accessories
          </div>
        </div>
        <BelowBox imageUrls={this.state.imageUrls} getClickedItem={this.props.getClickedItem}/>
      </div>
    )
  }
}

export default CategoryTabs;
