const baseUrl = process.env.REACT_APP_API;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; // localhost:4000/api/endpoint

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

export {
  fetchWithoutToken,
}