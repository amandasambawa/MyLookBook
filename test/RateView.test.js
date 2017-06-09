import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import RateView from '../src/components/RateView.jsx';
import Rate from 'rc-rate';


/*
* This test file is for RateView
*
*/

//Make sure that RateView renders properly.
it('RateView renders properly.', () => {
  const wrapper = shallow(<RateView testing={true}/>);
});



/*
* The following tests encompass the UI.
*/


//Make sure the Composition UI is loading properly
it('renders the Comment Section of the page', () => {
  const wrapper = shallow(<RateView testing={true}/>);
  const title =           <div className="ratingsLabel">
            Composition
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});

//Make sure the Trendy UI is loading properly.
it('renders the Trendy section of the page', () => {
  const wrapper = shallow(<RateView testing={true}/>);
  const title =           <div className="ratingsLabel">
            Trendy
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});


//Make sure the Comment UI is loading properly
it('renders the Comment Section of the page', () => {
  const wrapper = shallow(<RateView testing={true}/>);
  const title =           <div className="ratingsLabel">
            Comment
          </div>;
  expect(wrapper.contains(title)).toEqual(true);
});



//make sure the images load space in the webpage.
describe('RateView', () => {
    it('check if the images loading up', () => {
        //let obj = {params: {outfitId: `-KkI2QGzORcXRcSoHT9j`} };
        const wrapper = shallow(<RateView testing={true}/>);
        const image = wrapper.find('img');
        expect(image.prop('src')).toEqual(true);

    });
  });


/*
* The following tests encompass the functionality
*/

  //Make sure handleComposition is changing the handleComposition state properly.
  it('make sure that handleComposition is working properly.', () => {
    const wrapper = shallow(<RateView testing={true}/>);
    wrapper.instance().handleComposition(5);
    expect(wrapper.state('ratingComposition')).toEqual(5);
  });

  //Make sure handleTrendy is changing the handleComposition state properly.
  it('make sure that handleTrendy is working properly.', () => {
    const wrapper = shallow(<RateView testing={true}/>);
    wrapper.instance().handleTrendy(1);
    expect(wrapper.state('ratingTrendy')).toEqual(1);
  });

  //Make sure handleCommentChange is changing the ratingComment state properly.
  it('make sure that handleCommentChange is working properly.', () => {
    const wrapper = mount(<RateView testing={true}/>);
    wrapper.instance().setState({ratingComposition:'hello world'});
    expect(wrapper.state('ratingComposition')).toEqual('hello world');
  });
