import React, { Component } from 'react';
import '../styles/BelowBox.css';

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
            <div className="scrollmenu">
                {this.returnCatalogItems()}
            </div>
        </div>
      )
    }
}

export default BelowBox;
