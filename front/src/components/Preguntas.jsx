import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
import Producto from './Producto';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/slickStyle.css';
import IosSendOutline from 'react-ionicons/lib/IosSendOutline';
import moment from 'moment';
import { checkLogin } from '../functions';

const Preguntas = ({ smallText, children, preguntas }) => {
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
          preguntas &&
                preguntas.map((pregunta) => {
                  const isOwner = false;
                  return (
                    <div className='tw-rounded tw-bg-white tw-mx-5 tw-my-5 tw-p-8 tw-shadow-md' key={pregunta._id}>
                      <p style={{ width: '100%' }} className='text-left'>
                        P:
                        {' '}
                        {pregunta.pregunta}
                      </p>
                      {
                        !isOwner || pregunta.respuesta ? (
                          <p style={{ width: '100%' }} className='text-right'>
                            R:
                            {' '}
                            { pregunta.respuesta }
                          </p>
                        ) : (
                          <div className='tw-flex tw-float-right' style={{ width: '50%' }}>
                            <input style={{ width: '80%' }} className='bg-transparent focus:outline-none focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal tw-ml-5' placeholder='Responder...' />
                            <IosSendOutline className='tw-my-3' fontSize='30px' color='black' />
                          </div>
                        )
                      }
                      <p className='tw-text-xs'>{moment(pregunta.creado_en).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                  );
                })
        }
      </div>
    </div>
  );
};

export default Preguntas;
