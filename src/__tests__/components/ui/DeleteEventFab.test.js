import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
  
});
