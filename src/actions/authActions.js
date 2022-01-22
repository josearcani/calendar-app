import { types } from '../types/types';
import { fetchWithoutToken } from '../helpers/fetch';


export const startLogin = (email, password) => {
  return async (dispatch) => {

    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const { ok, name, token, uid } = await resp.json(); // {name,ok,token,uid}
    
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime()); // to know when token was created

      dispatch(login({ name, uid }));

    }

  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
});
