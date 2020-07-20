import React from 'react';
import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
import Producto from './Producto';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/slickStyle.css';

const Preguntas = ({ smallText, children, preguntas }) => {

  return (
    <div className='tw-px-2 tw-pt-5'>
      <div className='leading-tight tw-pb-2'>
        <h2 className='tw-text-xl tw-font-bold text-orange-donar'>{children}</h2>
        <p className='tw-font-bold tw-text-gray-800 tw-text-sm'>{smallText}</p>
      </div>
      <div className='tw-overflow-x-hidden'>
        {
          preguntas &&
                preguntas.map((pregunta) => (
                  <div className='tw-rounded tw-bg-white tw-mx-5 tw-my-5 tw-p-8 tw-shadow-md'>
                    <p style={{ width: '100%' }} className='text-left'>
                      P:
                      {' '}
                      {pregunta.pregunta}
                    </p>
                    <p style={{ width: '100%' }} className='text-right'>
                      R:
                      {' '}
                      {pregunta.respuesta}
                    </p>
                    <p className='tw-text-xs'>{moment(pregunta.creado_en).format('YYYY-MM-DD HH:mm:ss')}</p>
                  </div>
                ))
        }
      </div>
      {/*<div className='tw-text-right pr-2 pt-2'>
        <button type='button' className='tw-font-bold tw-text-gray-700'>Ver más ...</button>
        </div>*/}
    </div>
  );
};

export default Preguntas;
