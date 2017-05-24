import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, render, mount} from 'enzyme';
import SingleOutfitView from '../src/components/SingleOutfitView.jsx';
import Rate from 'rc-rate';

/*
* This file is for testing for SingleOutfitView
*/

/*
* Declaring the parameters required to run SingleOutfitView
*/
let obj = {
    params: {
      outfitId: "-KkqBqCQaTyix3Xz-r5p"
    }
}

let uid = "1aVzjhagXhPbm0YWgfNyWRJIElf1";

//Make sure that SingleOutfitView can even render.
it('SingleOutfitView renders properly.', () => {
  const wrapper = shallow(<SingleOutfitView
    testing={true} uid={uid} match={obj} />);
  const wrapper2 = mount(<SingleOutfitView
    testing={true} uid={uid} match={obj} />);
  const wrapper3 = render(<SingleOutfitView
    testing={true} uid={uid} match={obj} />);
});

/*
* The following tests encompass the UI.
*/


//Make sure the Overall Composition section is loading properly
it('renders the Overall Composition of the page', () => {
  const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
  const title =  <div className="ratingsLabel">
  Overall Composition
  </div>;
  expect(wrapper.contains(title)).toEqual(true);
});


//Make sure the Overall Trendy section is loading properly
it('renders the Overall Trendy of the page', () => {
  const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
  const title =  <div className="ratingsLabel">
  Overall Trendy
  </div>;
  expect(wrapper.contains(title)).toEqual(true);
});



//Make sure the Ratings and Comments section is loading properly
it('renders the Comment Section of the page', () => {
  const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
  const title =  <div className="ratingsLabel">
      Ratings and Comments
      </div>;
  expect(wrapper.contains(title)).toEqual(true);
});




//make sure the images load space in the webpage.
describe('SingleOutfitView', () => {
    it('check if the images loading up', () => {
        const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
        const image = wrapper.find('img').exists();
        expect(image).toEqual(true);
    });
  });


/*
* The following tests encompass the functionality
*/

  //Make sure that load ratings works. As long as loadratings does not cause an
  //error, it is working properly.
  it('make sure that handleComposition is working properly.', () => {
    const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
    wrapper.instance().loadRatings();
  });
