
export const petition = (path, method, authorization = '', objectBody = {}) => {

  const headers = { method,
    body: JSON.stringify(objectBody),
    headers: {
      'Content-Type': 'application/json',
      authorization,
    },
  // credentials: 'include',
  };
  return fetch(`https://donar-back.herokuapp.com/${path}`, headers)
    .then((response) => {
      return response.json();
    }).catch((error) => {
      console.log(error);
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};

export const a = () => {

};
