import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true,
}

describe('Test on authReducer', () => {
  test('should return the default state', () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });
  
  test('should return a name and uid', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'acb123',
        name: 'Joseph',
      }
    }

    const state = authReducer(initState, action);
    expect(state).toEqual({
      checking: false,
      ...action.payload
    })
  });

  test('should return checking false', () => {
    const action = { type: types.authCheckingFinish };
    const state = authReducer(initState, action);

    expect(state).toEqual({ checking: false });
  });
});
