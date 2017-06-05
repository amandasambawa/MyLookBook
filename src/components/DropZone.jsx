import React, {Component} from 'react';
import {auth} from '../firebase.js';
import interact from 'interactjs';
import '../styles/DropZone.css'

class DropZone extends Component {
  constructor() {
    super();
    this.startGesture = this.startGesture.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    document.body;

  }

  startGesture() {
    var scale = 1,
      gestureArea = document.getElementsByClassName('DropZoneContainer'),
      scaleElement = document.getElementsByClassName('draggable'),
      resetTimeout,
      index = 0;
      // let restrict = document.getElementById('dropZoneAndContainer');

      //console.log('scaleElement: ',scaleElement);
    interact('.inside').draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: false,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      // enable autoScroll
      autoScroll: false,

      // call this function on every dragmove event
      onmove: this.dragMoveListener,
      // call this function on every dragend event
      onstart: function(event) {
        index++;
        event.target.style.zIndex = index;
      },
      onend: function(event) {
      //  event.target.style.zIndex = 0;
      }
    }).gesturable({
      onstart: function(event) {
        clearTimeout(resetTimeout);
        scaleElement.classList.remove('reset');
      },
      onmove: function(event) {
        scale = scale * (1 + event.ds);

        scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(' + scale + ')';

        this.dragMoveListener(event);
      },
      onend: function(event) {
        //resetTimeout = setTimeout(reset, 1000);
        scaleElement.classList.add('reset');
      }
    }).resizable({
        preserveAspectRatio: true,
        invert: 'none',
        restrict: {
          restriction: "parent",
          endOnly: false,
          elementRect: {
            top: 1,
            left: 1,
            bottom: 1,
            right: 1
          }
      },
      edges: { left: false, right: true, bottom: true, top: false },
      onstart: function (event) {
        // anyonstart evenets
      },
      onend  : function (event) {
          console.log('onend: ',event.target);
          if(event.target.height <= 80 || event.target.width <= 80){
            console.log('too small');
            event.target.style.height='80px';
            event.target.style.width='80px';
          }
      }
    })
    .on('resizemove', function (event) {
      var target = event.target;
      //console.log(target);
      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

    });
  }

  renderImage(){
      let urls = this.props.clickedItems;
      return(
          this.props.clickedItems.map((item) => {
              // if (item.top === this.props.pos.top && item.left === this.props.pos.left){
              //   this.props.pos["position"] = "absolute";
              //   return <img ref="child" className="inside" style={this.props.pos} src={item.url}/>
              // }else{
                let pos = {top: item.top, left: item.left};
                pos["position"] = "absolute";
                return <img className="inside" style={pos} src={item.url}/>
              // }

          })
      );
  }

  render() {
    return (
      <div>
        <div className="DropZoneContainer">
        <img id="undoButton" src="https://vignette3.wikia.nocookie.net/animaljam/images/a/ac/Undo-button.png/revision/latest?cb=20150915173321" onClick={this.props.undoItem}></img>
            {this.renderImage()}
            {this.startGesture()}
        </div>
      </div>
    );
  }
}

export default DropZone;
