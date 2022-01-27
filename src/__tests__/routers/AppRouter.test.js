import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../Routers/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);




describe('Test on <AppRouter />', () => {
  test('should show loader', () => {
    const initState = {
      auth: {
        checking: true
      }
    };
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect( wrapper.find('h1').text().trim()).toBe('Espere');
  });
  
});
