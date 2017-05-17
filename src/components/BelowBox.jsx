import React, { Component } from 'react';


class BelowBox extends Component {
    constructor(){
      super();
      this.returnCatalogItems = this.returnCatalogItems.bind(this);
    }
    returnCatalogItems(){
        return this.props.imageUrls.map((url)=>{
            return (<img src={url}></img>);
        })
    }

    render(){
      return(
        <div className="belowBox">
          {this.returnCatalogItems()}
        </div>
      )
    }
}

export default BelowBox;
