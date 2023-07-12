import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/Home';

describe('Form', () => {
  test('after the text-input it should navigate to asteriod-details page with input text', () => {
    const navigation = { navigate: jest.fn() };
    const component = shallow(<Home navigation={navigation} />);
    const textInput = component.find("[data-testid='text-input']");
    textInput.simulate('changeText', "456789");
    const button = component.find("[data-testid='submit-button']");
    expect(button).toBeTruthy();
    button.simulate('press');
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
