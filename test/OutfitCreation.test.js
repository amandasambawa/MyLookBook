import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import OutfitCreation from '../src/components/OutfitCreation.jsx';


/*
* This file is for testing for OutfitCreation
*/

//Make sure that OutfitCreation can even render.
it('OutfitCreation renders properly.', () => {
  const wrapper = shallow(<OutfitCreation />);
  const wrapper2 = mount(<OutfitCreation />);
  console.log(wrapper.debug());
});


/*
* UI tests begin here
*/

//make sure the initial divs are loaded up and proper.
describe('OutfitCreation', () => {
    it('check if the title loading up', () => {
        const wrapper = shallow(<OutfitCreation />);
        const title =
        <h3 id="nameLabel">
        Outfit Name:
        </h3>;
        expect(wrapper.contains(title)).toEqual(true);
    });
  });


//make sure the input space is loaded up in the webpage.
describe('OutfitCreation', () => {
    it('check if the input box is loading up', () => {
        const wrapper = shallow(<OutfitCreation />);
        const image = wrapper.find('input').exists();
        expect(image).toEqual(true);
    });
  });

//make sure the initial input settings is corect
describe('OutfitCreation', () => {
      it('check if input defaults are correct', () => {
        const wrapper = shallow(<OutfitCreation />);
        const input = wrapper.find('input');
        expect(input.prop('maxLength')).toEqual("20");
        expect(input.prop('value')).toEqual("Title");
    });
  });

//make sure that dropzone component is loaded up
describe('OutfitCreation', () => {
    it('check if DropZone is loading up', () => {
        const wrapper = shallow(<OutfitCreation />);
        const dropZone = wrapper.find('DropZone').exists();
        expect(dropZone).toEqual(true);
    });
  });

//make sure that categorytabs component is loaded up
describe('OutfitCreation', () => {
    it('check if CategoryTabs is loading up', () => {
        const wrapper = shallow(<OutfitCreation />);
        const catTabs = wrapper.find('CategoryTabs').exists();
        expect(catTabs).toEqual(true);
    });
  });

//make sure that alerts is loaded up
describe('OutfitCreation', () => {
    it('check if the Alerts is loading up', () => {
        const wrapper = shallow(<OutfitCreation />);
        const alert = wrapper.find('AlertContainer').exists();
        expect(alert).toEqual(true);
    });
  });


/*
* Functionality tests begin here:
*/

//Make sure OutfitCreation is changing the title state properly.
it('make sure that OutfitCreation state title is working properly', () => {
  const wrapper = shallow(<OutfitCreation />);
  wrapper.instance().setState({title:'testing!'});
  expect(wrapper.state('title')).toEqual('testing!');
});



//Make sure handleGlobalLock is working
it('make sure that handleGlobalLock', () => {
  const wrapper = shallow(<OutfitCreation />);
  wrapper.instance().setState({testing:Boolean(true)});
  wrapper.instance().setState({global:Boolean(true)});
  wrapper.instance().handleGlobalLock();
});
