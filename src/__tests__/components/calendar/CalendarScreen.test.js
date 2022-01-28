import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/eventsActions';
import { act } from '@testing-library/react';

jest.mock('../../../actions/eventsActions', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  ui: {
    modalOpen: false
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
store.dispatch = jest.fn();

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
    const calendar = wrapper.find('Calendar');
    
    // check messages
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    // double click
    calendar.prop('onDoubleClickEvent')();
    // the action is synchronous
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
    
    //onSelectEvent
    calendar.prop('onSelectEvent')({ start: 'Hola'}); // mock eventSetActive
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola'});
    
    // onView check if saves to localStorage
    act(() => {
      // use act because it modifies the state
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
});
