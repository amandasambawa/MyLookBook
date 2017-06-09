import React, { Component } from 'react';
import '../styles/BelowBox.css';

class BelowBox extends Component {
    constructor(){
      super();
      this.returnCatalogItems = this.returnCatalogItems.bind(this);
    }


    returnCatalogItems(){
        return this.props.imageObj.map((itemObj)=>{
            return (<div className="noTouch"><img className="draggable" src={itemObj.imgUrl}
            data-itemimgurl={itemObj.imgUrl}
            data-itemproductid={itemObj.productId}
            data-itemmacysurl={itemObj.macysUrl}
            onClick={this.clicked}/>
              </div>);
        })
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
