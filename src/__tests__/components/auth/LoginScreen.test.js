import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/authActions';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../../actions/authActions', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));

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

  beforeEach(() => {
    jest.clearAllMocks();
  })

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

  test('should FAIL register when passwords do not match', () => {
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456'
      }
    })
    wrapper.find('form').at(1).simulate('submit', { preventDefault(){} });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales', 'error');
  });
  
  test('should register normally', () => {
    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: '123456'
      }
    })
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456'
      }
    })
    wrapper.find('form').at(1).simulate('submit', { preventDefault(){} });
    expect(startRegister).toHaveBeenCalledWith('nataly', 'nataly@test.com', '123456');
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
