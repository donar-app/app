import React, { useState } from 'react';
import IosSendOutline from 'react-ionicons/lib/IosSendOutline';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoaderDualRing from './LoaderDualRing';
import { petition } from '../functions';

const Pregunta = ({ usuario, pregunta, authorization }) => {
  const history = useHistory();
  const isOwner = usuario && usuario.id === pregunta.publicacion.anunciante_id;
  const [respuesta, setRespuesta] = useState('');

  const handleResponder = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando pregunta...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('preguntas/responder-pregunta', 'PUT', authorization.authorization, {
      respuesta,
      id: pregunta._id,
      publicacion_id: pregunta.publicacion_id,
    })
      .then((response) => {
        if (response.tipo === 'error') {
          if (response.codigo === 'token_no_valido') {
            Swal.fire({
              title: 'No se encuentra registrado o logueado',
              text: '¿Que desea hacer?',
              icon: 'question',
              showCloseButton: true,
              showCancelButton: true,
              confirmButtonText: 'Iniciar Sesion',
              cancelButtonText: 'Registrarse',
              confirmButtonColor: '#0071bc',
              cancelButtonColor: '#dd7f0e',
            }).then((result) => {
              console.log(result);
              if (result.isConfirmed) {
                history.push('/iniciarSesion');
              } else {
                history.push('/registrarse');
              }
            });
          } else {
            const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
            Swal.fire(
              'Error al Solicitar',
              mensaje,
              'error',
            );
          }
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Respuesta Realizada!',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          })
            .then(() => {
              history.go(0);
            });
        }
      });
  };

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
            <input value={respuesta} onChange={(e) => setRespuesta(e.target.value)} style={{ width: '80%' }} className='bg-transparent focus:outline-none focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal tw-ml-5' placeholder='Responder...' />
            <IosSendOutline className='tw-my-3' fontSize='30px' color='black' onClick={handleResponder} />
          </div>
        )
      }
      <p className='tw-text-xs'>{moment(pregunta.creado_en).format('YYYY-MM-DD HH:mm:ss')}</p>
    </div>
  );
};

export default Pregunta;
