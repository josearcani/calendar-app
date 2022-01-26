import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';

const initState = {
  modalOpen: false,
};

describe('Test on uiReducer', () => {
  test('should return the default state', async () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should open and close the modal', () => {
    const actionOpen = { type: types.uiOpenModal };
    const actionClose = { type: types.uiCloseModal };

    let state = uiReducer(initState, actionOpen);
    expect(state.modalOpen).toBe(true);
    
    state = uiReducer(initState, actionClose);
    expect(state.modalOpen).toBe(false);
  });
});
