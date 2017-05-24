import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import SingleOutfitView from '../src/components/SingleOutfitView.jsx';
import Rate from 'rc-rate';



//Make sure that SingleOutfitView can even render.
it('SingleOutfitView renders properly.', () => {
  const wrapper = shallow(<SingleOutfitView testing={true}/>);
  const inputTab = wrapper.find('input');
  inputTab.setProps({ value: 'bar' });
  expect(image.prop('src')).toEqual(true);
  //const wrapper2 = mount(<SingleOutfitView />);
  //const wrapper3 = render(<SingleOutfitView />)
});
