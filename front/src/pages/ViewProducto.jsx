import React from 'react';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import remeraGris from '../assets/static/remeraGris.jpg';
import LoaderDualRing from '../components/LoaderDualRing';
import { petition } from '../functions';

const ViewProducto = ({ authorization, setAuthorization }) => {
  const history = useHistory();
  const handleClick = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Enviando datos...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('publicaciones', 'POST', authorization, {
      publicacion_id: '5ed3b601e2e4eb8f20904676',
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
      <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
        <img className='tw-object-contain tw-rounded-full shadow-left p-1 tw-h-24 tw-w-24' src={remeraGris} alt='' />
        <h2 className='text-center tw-font-bold tw-pt-2 tw-text-xl'>Remera Gris</h2>
      </div>
      <div className='tw-px-4 py-4'>
        <h3 className='tw-text-lg tw-font-bold pb-1'>Descripcion:</h3>
        <p className='tw-p-1 tw-border tw-rounded'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam nihil similique dolorum ex placeat reprehenderit minus illo impedit, obcaecati incidunt recusandae nostrum deleniti eum sunt distinctio beatae accusantium dolorem. Asperiores.
        </p>
      </div>
      <div className='tw-text-center'>
        <button onClick={handleClick} type='button' className='bg-blue-donar hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>¡Solicitar!</button>
      </div>
    </main>
  );
};

export default ViewProducto;
