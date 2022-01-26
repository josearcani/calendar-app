import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { startEventDeleted } from '../../../actions/eventsActions';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// to make second test more precise
jest.mock('../../../actions/eventsActions', () => ({
  startEventDeleted: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({});
store.dispatch = jest.fn(); // only need to see when dispatch something

const wrapper = mount(
  <Provider store={ store }>
    <DeleteEventFab />
  </Provider>
);

describe('Test on <DeleteEventFab />', () => {
  
  test('should <DeleteEventFab /> render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should call startEventDeleted when click', () => {
    wrapper.find('button').simulate('click');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(startEventDeleted).toHaveBeenCalled();
  });
  
});
