import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startLogin } from '../../actions/authActions';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// sweet alert mock
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const initState = {
  auth: {
    checking: true,
    // uid: null,
    // name: null,
  },
};

// mock of localstorage
Storage.prototype.setItem = jest.fn();

const store = mockStore(initState);

describe('Test on authActions', () => {

  beforeEach(() => {
    // store = mockStore(initState);
    store.clearActions();
    jest.clearAllMocks();
  })

  test('should first startLogin action run correctly', async () => {
    await store.dispatch(startLogin('joseph@test.com', 'secret'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        name: 'joseph',
        uid: expect.any(String)
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    // this is how to retrive data that's passed through a mock [[first call],[second call]]
    // token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1]);
  });
  
  test('should second startLogin action fail', async () => {
    await store.dispatch(startLogin('joseph@test.com', '123'));
    const actions = store.getActions(); // no actions when fails
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Correo o contraseña no válido - contraseña', 'error');

    await store.dispatch(startLogin('notexists@test.com', 'secret'));
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Correo o contraseña no válido - correo', 'error');
  });
});
