import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  ui: {
    openModal: false
  },
  calendar: {
    events: [],
    activeEvent: {}
  },
  auth: {
    uid: '1234mmisaerg',
    name: 'joseph'
  }
};
const store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <CalendarScreen />
  </Provider>
)


describe('Test on <CalendarScreen >', () => {
  test('should render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should interact with calendar', () => {
    
  });
  
  
});
