import React, {Component} from 'react';
import {auth} from '../firebase.js';
import interact from 'interactjs';
import '../styles/DropZone.css'

class DropZone extends Component {
  constructor() {
    super();
    this.startDragging = this.startDragging.bind(this);
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
  }

  startDragging() {
    interact('.draggable').draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      // enable autoScroll
      //autoScroll: true,

      // call this function on every dragmove event
      onmove: this.dragMoveListener,
      // call this function on every dragend event
      onend: function(event) {
        var textEl = event.target.querySelector('p');

        textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + 'px');
      }
    });
  }

  pingchZoom() {
    var scale = 1,
      gestureArea = document.getElementById('DropZoneContainer'),
      scaleElement = document.getElementById('draggable'),
      resetTimeout;

    interact(gestureArea).gesturable({
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
    }).draggable({onmove: this.dragMoveListener});

  }
  // reset() {
  //   scale = 1;
  //   scaleElement.style.webkitTransform = scaleElement.style.transform = 'scale(1)';
  // }

  // this is used later in the resizing and gesture demos
  //window.dragMoveListener = dragMoveListener;

  render() {
    return (
      <div>
        <h1>DropZone</h1>
        <div className="DropZoneContainer">
          <div className="draggable"></div>
          {this.startDragging()}
        </div>
      </div>
    );
  }
}

export default DropZone;
