import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Test on Fetch helper', () => {
  let token = '';

  test('should fetchWithoutToken work', async () => {
    const resp = await fetchWithoutToken('auth', { email: 'dalila@test.com', password: 'secret' }, 'POST');
    expect(resp instanceof Response).toBe(true);
  
    const body = await resp.json();
    // console.log(body)
    expect(body.ok).toBe(true);

    token = body.token;
  });
  
  test('should fetchWithToken use token from localStorage', async () => {
    localStorage.setItem('token', token); // for test set token 
    const resp = await fetchWithToken('events/61eb41b03cf6b412e2eef002', {}, 'DELETE');
    const body = await resp.json();

    expect(body.ok).toBe(false);
    expect(body.msg).toBe('No existe un evento con ese id');
  });
});
