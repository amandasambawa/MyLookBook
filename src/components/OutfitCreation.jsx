import React, {Component} from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import DropZone from './DropZone.jsx';
import SaveOutfitButton from './SaveOutfitButton.jsx';
import {database} from '../firebase.js';
import AlertContainer from 'react-alert';
import '../styles/OutfitCreation.css';

class OutfitCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickedItems: [],
      title:"",
      global: false,
      lockImgSrc:"../assets/locked.svg"
    }
    this.getClickedItem = this.getClickedItem.bind(this);
    this.undoItem = this.undoItem.bind(this);
    this.nameOutfit = this.nameOutfit.bind(this);
    this.handleGlobalLock = this.handleGlobalLock.bind(this);
    this.passItemCount = this.passItemCount.bind(this);
  }

  static propTypes = {
    addSteps: React.PropTypes.func.isRequired,
  }


  componentDidMount() {
    this.props.addSteps([
      {
        title: 'Auto Scroll',
        text: 'Scroll to correct position if required. <i>It can be turned off</i>',
        selector: '#outfitCreationContainer',
        position: 'top',
        style: {
          mainColor: '#a350f0',
          beacon: {
            inner: '#a350f0',
            outer: '#a350f0',
          },
        },
      }])
  //  console.log(this.props);
/*    this.setState({steps: [{
      title: 'Auto Scroll',
      text: 'Scroll to correct position if required. <i>It can be turned off</i>',
      selector: '#area-chart',
      position: 'top',
      style: {
        mainColor: '#a350f0',
        beacon: {
          inner: '#a350f0',
          outer: '#a350f0',
        },
      },
    }]}); */

    // var newSteps = {steps: [
    //     {
    //       title: 'Auto Scroll',
    //       text: 'Scroll to correct position if required. <i>It can be turned off</i>',
    //       selector: '#area-chart',
    //       position: 'top',
    //       style: {
    //         mainColor: '#a350f0',
    //         beacon: {
    //           inner: '#a350f0',
    //           outer: '#a350f0',
    //         },
    //       },
    //     },
    //     {
    //       title: 'Hide Elements',
    //       text: 'Sample texti is here',
    //       textAlign: 'center',
    //       selector: '#outfitNameField',
    //       position: 'left',
    //       style: {
    //         backgroundColor: '#12d217',
    //         borderRadius: 0,
    //         color: '#fff',
    //         mainColor: '#fff',
    //         textAlign: 'center',
    //         beacon: {
    //           inner: '#12d217',
    //           outer: '#12d217',
    //         },
    //         skip: {
    //           display: 'none',
    //         },
    //         back: {
    //           display: 'none',
    //         },
    //       },
    //     },
    //   ]};

    // this.setState(newSteps, function() {
    //   console.log("steps state");
    //   console.log(this.state.steps);
    // });





  /**   this.props.addSteps([
      {
        title: 'Auto Scroll',
        text: 'Scroll to correct position if required. <i>It can be turned off</i>',
        selector: '#area-chart',
        position: 'top',
        style: {
          mainColor: '#a350f0',
          beacon: {
            inner: '#a350f0',
            outer: '#a350f0',
          },
        },
      },
      {
        title: 'Hide Elements',
        text: 'Sample texti is here',
        textAlign: 'center',
        selector: '#donut-chart',
        position: 'left',
        style: {
          backgroundColor: '#12d217',
          borderRadius: 0,
          color: '#fff',
          mainColor: '#fff',
          textAlign: 'center',
          beacon: {
            inner: '#12d217',
            outer: '#12d217',
          },
          skip: {
            display: 'none',
          },
          back: {
            display: 'none',
          },
        },
      },
    ]); **/
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
    if(this.state.global === false ){
      this.setState({global:true})
      if (this.props.testing === true){
        return true;
      }else{
        this.props.setGlobal(Boolean(true));
      }
      this.setState({lockImgSrc:"../assets/unlocked.svg"});
      //console.log("lock img:", this.state.lockImgSrc);
    }else{
      this.setState({global:false});
      if (this.props.testing === true){
        return true;
      }else{
        this.props.setGlobal(Boolean(false));
      }
      this.setState({lockImgSrc:"../assets/locked.svg"});
      //console.log("lock img:", this.state.lockImgSrc);
    }
  }

  getClickedItem(item) {
    // get the url and then add it to the array in state
    if (this.state.clickedItems.length <= 5) {
      let itemsArray = this.state.clickedItems.slice();
      itemsArray.push(item);
      this.setState({clickedItems: itemsArray});
    } else {
      this.msg.show('Reached Maximum(6) Items', {
        time: 20000,
        type: 'error'

      })
    }
    this.passItemCount();
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

  passItemCount(){
    var itemCounts = this.state.clickedItems.length + 1;
    //console.log(itemCounts);
    this.props.setItemCount(itemCounts);
  }

  nameOutfit(event){
    this.setState({title:event.target.value});
    this.props.setTitle(event.target.value);
  }

  render() {
    return (
        <div id="outfitCreationContainer">
            <span onClick={this.handleGlobalLock}>{this.state.global} <img id="lockIcon" src={this.state.lockImgSrc} /></span>
            {/*<button onClick={this.handleGlobalLock} className="button">{this.state.global}</button> */}
            <input id="outfitNameField" placeholder="Your outfit name here" maxLength="20" value={this.state.title} onChange={this.nameOutfit} />
            {/*
            <div id="outfitNameContainer">
                <input className="outfitName" maxLength="20" value={this.state.title} onChange={this.nameOutfit}/>
            </div>
            */}
            <div>
                <DropZone clickedItems={this.state.clickedItems} undoItem={this.undoItem}/>
                <CategoryTabs getClickedItem={this.getClickedItem}/>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions}/>
            </div>
        </div>
    );
  }

}

export default OutfitCreation;
