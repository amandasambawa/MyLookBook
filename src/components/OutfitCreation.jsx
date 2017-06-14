import React, {Component} from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import {database} from '../firebase.js';
import interact from 'interactjs';
import Navigation from './Navigation.jsx';
import Logout from './Logout.jsx';
import Joyride from 'react-joyride';
import '../styles/OutfitCreation.css';
import NotificationSystem from 'react-notification-system';

const feedToJoyride   =  {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      isReady: true,
      isRunning: true,
      stepIndex: 0,
      steps: [
        {
          title: 'Public or Private',
          text: 'Toggle to keep private or share with the world',
          selector: '#lockIcon',
          position: 'bottom',
        },
        {
          title: 'Outfit Title',
          text: 'Add a title to your oufit',
          selector: '#outfitNameField',
          position: 'bottom',
        },
        {
          title: 'Pick an item',
          text: 'Drag and drop any item onto the canvas',
          selector: '.belowBox',
          position: 'top',
        },
        {
          title: 'Save Outfit',
          text: 'When your done click here to save the outfit to your closet!',
          selector: '.small-6',
          position: 'top',
        }
      ],
      selector: '',
    };

class OutfitCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItems: [],
      title: "",
      global: false,
      lockImgSrc: "../assets/locked.svg",
      itemCount: 0,
      tutorial: false,
    }
    this.droppedItem = this.droppedItem.bind(this);
    this.undoItem = this.undoItem.bind(this);
    this.nameOutfit = this.nameOutfit.bind(this);
    this.handleGlobalLock = this.handleGlobalLock.bind(this);
    this.startGesture = this.startGesture.bind(this);
    this.joyrideCreation = this.joyrideCreation.bind(this);
    this.callback = this.callback.bind(this);
  }

  static propTypes = {
    addSteps: React.PropTypes.func.isRequired,
  }


  componentDidMount() {
    this.startGesture();

    //checking the database to see if its a first time user.
    let dataBase = database.ref(`/users/${this.props.uid}`);
    dataBase.child("tutorials").once("value").then((snapshot)=> {
        if(snapshot.child("outfitTutorial").exists() ){
          let joyTemp = snapshot.child("outfitTutorial").val();
          //if the tutorial is false, then we set the state to be false.
          this.setState({tutorial: joyTemp});
        }else{
          this.setState({tutorial: true})
        }
    });
  }

  //handles the global Lock state
  handleGlobalLock() {
    if (this.state.global === false) {
      this.setState({global: true})
      if (this.props.testing === true) {
        return true;
      } else {
        this.props.setGlobal(Boolean(true));
      }
      this.setState({lockImgSrc: "../assets/unlocked.svg"});
      //console.log("lock img:", this.state.lockImgSrc);
    } else {
      this.setState({global: false});
      if (this.props.testing === true) {
        return true;
      } else {
        this.props.setGlobal(Boolean(false));
      }
      this.setState({lockImgSrc: "../assets/locked.svg"});
      //console.log("lock img:", this.state.lockImgSrc);
    }
  }



  droppedItem(item, pos){
    if (this.state.clickedItems.length <= 5) {
      let itemsArray = this.state.clickedItems.slice();
      let newPos = Object.assign({}, pos);
      newPos.productId =  item.dataset.itemproductid;
      newPos.imgUrl =  item.dataset.itemimgurl;
      newPos.macysUrl =  item.dataset.itemmacysurl;
      itemsArray.push(newPos);
      // , pos: pos
      this.setState({clickedItems: itemsArray, itemCount: itemsArray.length});
    } else {
      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `Reached Maxiumum(6) Items`,
        level: 'error'
    });
    }
  }

  undoItem() {
    if (this.state.clickedItems.length >= 1) {
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.pop();
      this.setState({clickedItems: itemsArray, itemCount: itemsArray.length});
    } else {
      this.refs.notificationSystem.clearNotifications();
      this.refs.notificationSystem.addNotification({
        message: `There are no items!`,
        level: 'error'
    });
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


  callback(data) {

        if(data.type === "finished"){
          let tutorialRef = database.ref(`/users/${this.props.uid}/tutorials/outfitTutorial`);
          tutorialRef.set({
            outfitTutorial: Boolean(false)
          })
        }
  }

  joyrideCreation() {

    if(this.state.tutorial === true){
      const {
        isReady,
        isRunning,
        joyrideOverlay,
        joyrideType,
        selector,
        stepIndex,
        steps,
      } = feedToJoyride;

      return (
        <div>
          <Joyride
            ref={c => (this.joyride = c)}
            callback={this.callback}
            allowClicksThruHole={false}
            debug={false}
            locale={{
              back: (<span>Back</span>),
              close: (<span>Close</span>),
              last: (<span>Last</span>),
              next: (<span>Next</span>),
              skip: (<span>Skip</span>),
            }}
            run={isRunning}
            showOverlay={joyrideOverlay}
            showSkipButton={true}
            showStepsProgress={true}
            scrollToSteps={false}
            stepIndex={stepIndex}
            steps={steps}
            type={joyrideType}
          />
        </div>
      );
    }else{
  }
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
          this.droppedItem(event.relatedTarget, pos);
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
        event.target.style.left = `${Math.round(event.target.getBoundingClientRect().left - something)}px`;
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
        {this.joyrideCreation()}
        <Logout />
        <div id="outfitCreationContainer">
          <span onClick={this.handleGlobalLock}>{this.state.global}
            <img id="lockIcon" src={this.state.lockImgSrc}/></span>
          {/*<button onClick={this.handleGlobalLock} className="button">{this.state.global}</button> */}
          <input id="outfitNameField" placeholder="Your outfit name here" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/> {/*
              <div id="outfitNameContainer">
                  <input className="outfitName" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/>
              </div>
              */}
          <div>
            <div id="dropZoneAndContainer">
              <DropZone pos={this.state.pos} clickedItems={this.state.clickedItems} undoItem={this.undoItem}/>
              <CategoryTabs />
            </div>
            <NotificationSystem ref="notificationSystem" />
          </div>
        </div>
        <Navigation render={true} uid={this.props.uid} global={this.state.global}
          title={this.state.title} clickedItems={this.state.clickedItems} itemCount={this.state.itemCount}/>
      </div>
    );
  }

}

export default OutfitCreation;
