import React, { Component } from 'react';
import '../styles/BelowBox.css';

class BelowBox extends Component {
    constructor(){
      super();
      this.returnCatalogItems = this.returnCatalogItems.bind(this);
      this.clicked = this.clicked.bind(this);
    }
    returnCatalogItems(){
        //console.log("bb imageObj: ", this.props.imageObj);
        return this.props.imageObj.map((itemObj)=>{
            return (<img className="categoryItems" src={itemObj.imgUrl}
            data-itemimgurl={itemObj.imgUrl}
            data-itemproductid={itemObj.productId}
            data-itemmacysurl={itemObj.macysUrl}
            onClick={this.clicked}/>);
        })
    }
    clicked(event) {
        var itemObj = {
            productId: event.target.dataset.itemproductid,
            imgUrl: event.target.dataset.itemimgurl,
            macysUrl: event.target.dataset.itemmacysurl
        }
        //console.log("clicked:", itemObj);
        this.props.getClickedItem(itemObj);
    }

    render(){
      return(
        <div className="belowBox">
            <div className="scrollmenu">
                {this.returnCatalogItems()}
            </div>
        </div>
      )
    }
}

export default BelowBox;
