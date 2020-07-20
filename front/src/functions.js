
export const petition = (path, method, authorization = '', objectBody = {}) => {
  let authorizationChange;
  let headers;
  if ((method === 'POST') || (method === 'PUT')) {
    headers = { method,
      body: JSON.stringify(objectBody || {}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      // credentials: 'include',
    };
  } else {
    headers = { method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      // credentials: 'include',
    };
  }
  return fetch(`http://api.donar-app.com/${path}`, headers)
    .then((response) => {
      authorizationChange = `Bearer ${response.headers.get('Authorization')}`;
      return response.json();
    }).catch((error) => {
      console.log(error);
      return { tipo: 'error' };
    })
    .then((response) => {
      console.log(response);
      return { ...response, authorization: authorizationChange };
    });
};

export const checkLogin = () => {
  const authorization = localStorage.getItem('authorization');

  return petition('usuarios', 'GET', authorization, {})
    .then((response) => {
      if (response.tipo === 'error') {
        return false;
      }
      return response.cuerpo;
    })
    .catch(() => false);
};

export const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});
