import React, { Component } from 'react';


class BelowBox extends Component {
    constructor(){
      super();
      this.returnCatalogItems = this.returnCatalogItems.bind(this);
      this.clicked = this.clicked.bind(this);
    }
    returnCatalogItems(){
        return this.props.imageUrls.map((url)=>{
            return (<img src={url} onClick={this.clicked}/>);
        })
    }
    clicked(event) {
        //console.log("src from", event.target.src);
        this.props.getClickedItem(event.target.src);
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
