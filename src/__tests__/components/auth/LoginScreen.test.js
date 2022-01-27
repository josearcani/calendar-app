import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/authActions';

jest.mock('../../../actions/authActions', () => ({
  startLogin: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <LoginScreen />
  </Provider>
)

describe('Test on <LoginScreen />', () => {
  test('should render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should run login dispatch', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'john@email.com'
      }
    });
    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: 'secret'
      }
    });

    wrapper.find('form').at(0).simulate('submit', { preventDefault(){} });
    expect(startLogin).toHaveBeenCalledWith('john@email.com', 'secret');
  });

  
  
});
