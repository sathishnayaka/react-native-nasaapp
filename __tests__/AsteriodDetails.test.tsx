import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import AsteriodDetails from '../src/AsteroidDetails';


jest.mock('axios');

describe('AsteriodDetails', () => {
  test('renders asteriod details correctly', async () => {
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
    Promise.resolve({ data: {
        nasa_jpl_url: "https:jplurl.com",
        name:"k10",
        is_potentially_hazardous_asteroid: true
    }, })
  );
    const navigation = { navigate: jest.fn() };
    const route = { params: { asteriodId: '345654' } };
    render(<AsteriodDetails navigation={navigation} route={route} />);

    await waitFor(() => screen.getByText('Name : k10'));
    expect(screen.getByText('Nasa JPL URL : https:jplurl.com ')).toBeTruthy();
  });

  test('should handle error in catch block', async () => {
    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.get.mockRejectedValueOnce(new Error('API request failed'));

    const navigation = {
      goBack: jest.fn(),
    };

    const route = {
      params: {
        asteriodId: '12345',
      },
    };

    const { getByTestId } = render(
      <AsteriodDetails navigation={navigation} route={route} />
    );

    await waitFor(() => {
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });
});

