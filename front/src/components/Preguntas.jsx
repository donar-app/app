import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
import Producto from './Producto';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/slickStyle.css';
import { checkLogin } from '../functions';
import Pregunta from './Pregunta';

const Preguntas = ({ smallText, children, preguntas, authorization }) => {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const getUsuario = async () => {
      const usuario = await checkLogin();

      if (usuario) {
        setUsuario(usuario);
      }
    };
    getUsuario();
    // return getData();
  }, []);

  return (
    <div className='tw-px-2 tw-pt-5'>
      <div className='leading-tight tw-pb-2'>
        <h2 className='tw-text-xl tw-font-bold text-orange-donar'>{children}</h2>
        <p className='tw-font-bold tw-text-gray-800 tw-text-sm'>{smallText}</p>
      </div>
      <div className='tw-overflow-x-hidden'>
        {
          preguntas && preguntas.map((pregunta) => <Pregunta authorization={authorization} pregunta={pregunta} usuario={usuario} key={pregunta._id} />)
        }
      </div>
    </div>
  );
};

export default Preguntas;
