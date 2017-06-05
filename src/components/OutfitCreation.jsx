import React, {Component} from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import {database} from '../firebase.js';
import AlertContainer from 'react-alert';
import interact from 'interactjs';
import '../styles/OutfitCreation.css';

class OutfitCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItems: [],
      title:"Title",
      global: false,
      pos: null,
      rerender: false
    }
    this.droppedItem = this.droppedItem.bind(this);
    this.undoItem = this.undoItem.bind(this);
    this.nameOutfit = this.nameOutfit.bind(this);
    this.handleGlobalLock = this.handleGlobalLock.bind(this);
    this.startGesture = this.startGesture.bind(this);

  }

  alertOptions = {
    offset: 50,
    position: 'top right',
    theme: 'dark',
    //time: 50000,
    transition: 'fade'
  }



  //handles the global Lock state
  handleGlobalLock() {
    if(this.state.global === false){
      this.setState({global:true})
      this.props.setGlobal(Boolean(true));
    }else{
      this.setState({global:false});
      this.props.setGlobal(Boolean(false));
    }
  }

  componentDidMount(){
    this.startGesture();
  }

  droppedItem(item, pos){
    console.log(pos, "inside dropped item");
    if (this.state.clickedItems.length <= 5) {
      let itemsArray = this.state.clickedItems.slice();
      let newPos = Object.assign({}, pos);
      newPos["url"] = item;
      itemsArray.push(newPos);
      this.setState({clickedItems: itemsArray});
      // , pos: pos
    } else {
      this.msg.show('Reached Maximum(6) Items', {
        time: 20000,
        type: 'error'

      })
    }
  }

  undoItem() {
    //console.log(this.state.clickedItems.length);
    if(this.state.clickedItems.length>=1){
      console.log("undo item");
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.pop();
      this.setState({clickedItems: itemsArray});
    }else{
      this.msg.show('There are no more items', {
        time: 20000,
        type: 'error'
        //icon: <img src="path/to/some/img/32x32.png"/>
      })
    }
  }



  nameOutfit(event){
    // passing up to app because saveoutfit is now in navigation
    this.setState({title:event.target.value});
    this.props.setTitle(event.target.value);
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
    gestureArea = document.getElementById('dropZoneAndContainer'),
    scaleElement = document.getElementsByClassName('draggable'),
    resetTimeout,
    index = 0;
    let restrict = document.getElementById('dropZoneAndContainer');

    interact('.DropZoneContainer').dropzone({
      overlap: 1,
      ondropactivate: (event) => {
        // add active dropzone feedback, anytime I start dragging an item
        // console.log("drop-active");
        // event.target.classList.add('drop-active');
      },
      ondragenter: (event) => {
        // runs whenever something draggable is in the dropzone
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        draggableElement.classList.add('can-drop');

      },
      ondragleave: (event) => {
        // runs whenever something draggable exits
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
      },
      ondrop: (event) => {
        event.relatedTarget.classList.remove('can-drop');
        if (event.relatedTarget.classList.contains("draggable")){
          let pos = {top: event.relatedTarget.getBoundingClientRect().top, left: event.relatedTarget.getBoundingClientRect().left};
          this.droppedItem(event.relatedTarget.src, pos);
          //runs when dropped
        }
      },
      ondropdeactivate: (event) => {
        //when I stop dragging an item
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        if (event.relatedTarget.classList.contains("inside") === false){
          event.relatedTarget.style = "";
          event.relatedTarget.setAttribute('data-x', 0);
          event.relatedTarget.setAttribute('data-y', 0);
        }
      }
    })
      //console.log('scaleElement: ',scaleElement);
    interact('.draggable').draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      restrict: {
        restriction: restrict,
        // endOnly: true,
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
      onstart: (event) => {
        let something = document.getElementsByClassName("scrollmenu")[0].scrollLeft;
        event.target.classList.add('dragging');
        console.log(event.target.getBoundingClientRect().left);
        event.target.style.left = `${Math.round(event.target.getBoundingClientRect().left - something)}px`;
        console.log(event.target.style.left);
        // index++;
        // event.target.style.zIndex = index;
      },
      onend: (event)=> {
        event.target.classList.remove('dragging');
      //  event.target.style.zIndex = 0;
      }
    })
  }

  render() {
    return (
        <div>
            <div className="outfitNameContainer">
                <input className="outfitName" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/>
            </div>
            <div>
              <div id="dropZoneAndContainer">
                <DropZone pos={this.state.pos} clickedItems={this.state.clickedItems} undoItem={this.undoItem}/>
                <CategoryTabs rerender={this.state.rerender}/>
              </div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
                <button onClick={this.handleGlobalLock} className="button">{this.state.global}</button>
            </div>
        </div>
    );
  }

}

export default OutfitCreation;
