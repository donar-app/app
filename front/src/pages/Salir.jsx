import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Salir = ({ authorization }) => {
  const history = useHistory();
  localStorage.setItem('authorization', null);
  history.push('/');
  return (<>Chau!</>);
};

export default Salir;
