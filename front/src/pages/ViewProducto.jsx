import React, { useEffect, useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
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
          setDataProducto({
            categoria: response.data.categoria,
            descripcion: response.data.descripcion,
            titulo: response.data.titulo,
            imagen: `https://api.donar-app.com/uploads/${response.data.imagen}`,
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
              title: 'No se encuentra registrado u logueado',
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
  return (
    <main className='animate__animated animate__fadeIn tw-pt-5'>
      {!dataProducto ? (
        <div className='tw-flex tw-justify-center tw-items-center'>
          <LoaderDualRing />
        </div>
      ) :
        (
          <>
            <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
              <img className='tw-object-contain tw-rounded-full shadow-left p-1 tw-h-24 tw-w-24' src={dataProducto.imagen} alt='' />
              <h2 className='text-center tw-font-bold tw-pt-2 tw-text-xl'>{dataProducto.titulo}</h2>
            </div>
            <div className='tw-px-4 py-4'>
              <h3 className='tw-text-lg tw-font-bold pb-1'>Descripcion:</h3>
              <p className='tw-p-1 tw-border tw-rounded'>
                {dataProducto.descripcion}
              </p>
            </div>
            <div className='tw-text-center'>
              <button onClick={handleClick} type='button' className='bg-blue-donar hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>¡Solicitar!</button>
            </div>
          </>
        )}
    </main>
  );
};

export default ViewProducto;
