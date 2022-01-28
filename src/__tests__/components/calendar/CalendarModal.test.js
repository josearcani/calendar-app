import React from 'react';
import '@testing-library/jest-dom';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, startEventUpdated } from '../../../actions/eventsActions';

jest.mock('../../../actions/eventsActions', () => ({
  startEventUpdated: jest.fn(),
  eventClearActiveEvent: jest.fn(),
}));


// Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const notNow = now.clone().add(1,'hours');

const initState = {
  ui: {
    modalOpen: true
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hello world',
      notes: 'Hello there',
      start: now.toDate(),
      end: notNow.toDate()
    }
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
    <CalendarModal />
  </Provider>
)

describe('Test on <CalendarModal />', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should render <CalendarModal />', () => {
    // no snapshot because time changes
    // Modal exists hidden an the bottom
    // expect(wrapper.find('.modal').exists()).toBe(true); this is not precise throws false positivies
    
    // use ariaHideApp={false} because is a test
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

  });

  test('should call startEventUpdated and closeModal actions', () => {
    wrapper.find('form').simulate('submit', { preventDefault(){} });
    expect(startEventUpdated).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should error if title input is empty', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: ''
      }
    })
    wrapper.find('form').simulate('submit', { preventDefault(){} });
    expect(wrapper.find('input[name="title"]').prop('className').includes('is-invalid')).toBe(true);
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });
});
