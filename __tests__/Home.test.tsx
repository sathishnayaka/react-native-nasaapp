import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/Home';
import axios from 'axios';

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
  test("after hitting randam button it should navigate to asteriod details page with randam asteriod id", () => {
    const axiosGetMock = jest.spyOn(axios, 'get');
    axiosGetMock.mockResolvedValue({
      data: {
        near_earth_objects: [
          { id: 'asteroid1' },
          { id: 'asteroid2' },
          { id: 'asteroid3' },
        ],
      },
    });
  const navigation = { navigate: jest.fn() };
    const component = shallow(<Home navigation={navigation} />);
    const button = component.find("[data-testid='random-button']");
    expect(button).toBeTruthy();
    button.simulate('press');
})
it('should handle errors when calling the API', async () => {
  const consoleErrorMock = jest.spyOn(console, 'error');
  consoleErrorMock.mockImplementation(() => {});

  const axiosGetMock = jest.spyOn(axios, 'get');
  axiosGetMock.mockRejectedValue(new Error('API error'));

  const navigation = { navigate: jest.fn() };
    const component = shallow(<Home navigation={navigation} />);

  const randomButton = component.find('[data-testid="random-button"]');
  randomButton.simulate('press');
  expect(randomButton).toBeTruthy();
  axiosGetMock.mockRestore();
  consoleErrorMock.mockRestore();
});
})
