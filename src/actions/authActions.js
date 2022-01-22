import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
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

export const startRegister = (name, email, password) => {
  return async (dispatch) => {

    const resp = await fetchWithoutToken('auth/new', {name, email, password }, 'POST');
    const body = await resp.json();

    // console.log('startRegister', body);
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({ name: body.name, uid: body.uid }));

    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  }
}

export const startChecking = () => {
  return async (dispatch) => {

    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();

    // console.log('startChecking', body);
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({ name: body.name, uid: body.uid }));
      
    } else {
      dispatch(checkingFinish());
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  }
}

const logout = () => ({
  type: types.authLogout
});

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

const checkingFinish = () => ({
  type: types.authCheckingFinish
});
