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





//Make sure prompt the user for feedback
it('renders call to action for feedback', () => {
  const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
  const title = <span id="linkTitle">Link:</span>;
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
  it('make sure that loadRatings is working properly.', () => {
    const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
    wrapper.instance().loadRatings();
  });

  //Make sure the injection is working, this test will only fail
  //if the code breaks
  it('make sure that injectRatingsContent is working properly', () => {
    const wrapper = shallow(<SingleOutfitView testing={true} uid={uid} match={obj} />);
    wrapper.instance().injectRatingsContent();
  });
