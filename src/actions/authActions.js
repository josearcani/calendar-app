import { types } from '../types/types';
import { fetchWithoutToken } from '../helpers/fetch';
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
  return async (dispatch) => {

    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json(); // {name,ok,token,uid}
    
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime()); // to know when token was created

      dispatch(login({ name: body.name, uid: body.uid }));

    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
});
