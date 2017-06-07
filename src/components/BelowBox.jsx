import React, { Component } from 'react';
import '../styles/BelowBox.css';

class BelowBox extends Component {
    constructor(){
      super();
      this.returnCatalogItems = this.returnCatalogItems.bind(this);
      // this.starter = this.starter.bind(this);
      // this.end = this.end.bind(this);
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
    //
    // onMouseUp={this.end}
    // onTouchEnd={this.end} onMouseDown={this.starter} onTouchStart={this.starter}

    // end(event) {
    //   // console.log("trying to run function getClickedItem");
    //   // this.props.getClickedItem(event.target.src);
    // //     //console.log("src from", event.target.src);
    // //     // this.props.getClickedItem(event.target.src);
    // //     event.target.classList.remove('dragging');
    // //     console.log(event.target.getBoundingClientRect());
    //     // this.setState({scrollClass: "movemenu"});
    // //
    // //     // top and left given, gets img relative to viewport
    // }
    // starter(event) {
    //   // this.setState({scrollClass: "staymenu"});
    // //
    // //   event.target.classList.add('dragging');
    // }

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
