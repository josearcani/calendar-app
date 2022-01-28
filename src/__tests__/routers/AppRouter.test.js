import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../Routers/AppRouter';
import { startChecking } from '../../actions/authActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../actions/authActions', () => ({
  startChecking: jest.fn()
}))

describe('Test on <AppRouter />', () => {

  test('should show loader', () => {
    const initState = {
      auth: {
        checking: true
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect( wrapper.find('h1').text().trim()).toBe('Espere');
  });

  test('should show public route', () => {
    const initState = {
      auth: {
        checking: false,
        name: null,
        uid: null
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );

    // const actions = store.getActions();
    // console.log(actions);
      expect(startChecking).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });
  
  test('should show private route', () => {
    const initState = {
      auth: {
        checking: false,
        name: 'joseph',
        uid: '231ion31inoianfa34adva'
      },
      calendar: {
        events: [],
        activeEvent: {}
      },
      ui: {
        modalOpen: false
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
