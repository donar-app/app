import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import IosChatbubbles from 'react-ionicons/lib/IosChatbubbles';
import IosPersonAdd from 'react-ionicons/lib/IosPersonAdd';
import moment from 'moment';
import LoaderDualRing from '../components/LoaderDualRing';
import { petition } from '../functions';

const ViewProducto = ({ authorization, setAuthorization }) => {
  const history = useHistory();
  const { id } = useParams();
  const [dataProducto, setDataProducto] = useState(null);

  useEffect(() => {
    petition(`publicaciones/${id}`, 'GET')
      .then((response) => {
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
          Swal.fire(
            'Error al encontrar el Producto',
            mensaje,
            'error',
          );
        } else {
          const { cuerpo } = response;
          const { imagen } = cuerpo;

          setDataProducto({
            ...cuerpo,
            imagen: `https://api.donar-app.com/uploads/${imagen}`,
          });
        }
      });
  }, [id]);

  const handleClick = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando datos...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('peticiones', 'POST', authorization.authorization, {
      publicacion_id: id,
      obj_peticion: {},
    })
      .then((response) => {
        if (response.tipo === 'error') {
          if (response.codigo === 'token_nulo') {
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
          setAuthorization({
            ...response.cuerpo,
            authorization: response.authorization,
          });
          Swal.fire({
            icon: 'success',
            title: '¡Solicitud Completada!',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          })
            .then(() => {
              history.push('/');
            });
        }
      });
  };

  const [pregunta, setPregunta] = useState(null);

  const handlePreguntar = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando pregunta...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('preguntas', 'POST', authorization.authorization, {
      pregunta,
      publicacion: id,
    })
      .then((response) => {
        if (response.tipo === 'error') {
          if (response.codigo === 'token_nulo') {
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
          setAuthorization({
            ...response.cuerpo,
            authorization: response.authorization,
          });
          Swal.fire({
            icon: 'success',
            title: 'Pregunta Realizada!',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          })
            .then(() => {
              history.push(`/publicacion/${dataProducto._id}`);
            });
        }
      });
  };

  return (
    <main className='animate__animated animate__fadeIn tw-pt-5'>
      {!dataProducto ? (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <LoaderDualRing />
        </div>
      ) :
        (
          <div>
            <div className='tw-rounded tw-bg-white tw-mx-5'>
              <div className='tw-flex tw-flex-col tw-justify-center tw-items-center col-xs-12'>
                <h2 className='text-center tw-font-bold tw-pt-2 tw-text-xl tw-m-5'>{dataProducto.titulo}</h2>
                <img className='tw-bg-gray-200 tw-object-contain tw-w-full' style={{ height: '40vh' }} src={dataProducto.imagen} alt='' />
              </div>
              <div className='tw-px-4 py-4'>
                <p className='tw-p-1 tw-rounded'>
                  {dataProducto.descripcion}
                </p>
              </div>
              <div className='tw-flex tw-justify-center'>
                <div className='tw-justify-center tw-items-center tw-w-5'>
                  <p className='text-center'>
                    {dataProducto.preguntas.length || '0'}
                    {' '}
                    <br />
                  </p>
                  <IosChatbubbles fontSize='5vw' color='black' />
                </div>
                <div style={{ width: '40%' }} />
                <div className='tw-justify-center tw-items-center tw-w-5'>
                  <p className='text-center'>
                    {dataProducto.preguntas.length || '0'}
                    {' '}
                    <br />
                  </p>
                  <IosPersonAdd fontSize='5vw' color='black' />
                </div>
              </div>
              <div className='tw-text-center'>
                <button onClick={handleClick} type='button' className='bg-blue-donar hover:bg-blue-900 text-white font-bold py-2 my-2 px-4 rounded'>¡Solicitar!</button>
              </div>
            </div>
            <h3 className='text-center tw-m-5 tw-text-xl'>Preguntas</h3>
            <div className='tw-flex-1'>
              <input value={pregunta} onChange={(e) => setPregunta(e.target.value)} className='bg-transparent focus:outline-none focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal tw-ml-5' style={{ width: '80%' }} placeholder='Preguntar...' />
              <button onClick={handlePreguntar} className='tw-border-black tw-p-3 tw-border'>Enviar</button>
            </div>
            <div>
              {
                dataProducto.preguntas &&
                dataProducto.preguntas.map((pregunta) => (
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
          </div>
        )}
    </main>
  );
};

export default ViewProducto;
