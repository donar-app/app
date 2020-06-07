import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Confetti from 'react-dom-confetti';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Input from '../components/Input';
import LoaderDualRing from '../components/LoaderDualRing';
import { petition, toBase64 } from '../functions';

const Donar = ({ authorization, setAuthorization }) => {

  const [activeConfetti, setActiveConfetti] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    setActiveConfetti(true);
    const file = document.querySelector('#fileRegister').files[0];
    const result = await toBase64(file).catch((e) => Error(e));
    if (result instanceof Error) {
      console.log('Error: ', result.message);
    }
    console.log(result);
    MySwal.fire({
      title: 'Enviando datos...',
      html: <LoaderDualRing />,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    petition('publicaciones', 'POST', authorization.authorization, {
      titulo: document.querySelector('#donarRegister').value,
      categoria: document.querySelector('#categoryRegister').value,
      imagen: result,
      descripcion: document.querySelector('#descriptionRegister').value,
      tipo: 'Donación',
    })
      .then((response) => {
        if (response.tipo === 'error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar';
          Swal.fire(
            'Error al Crear la donacion',
            mensaje,
            'error',
          );
        } else {
          setAuthorization({
            ...response.cuerpo,
            authorization: response.authorization,
          });
          Swal.fire({
            icon: 'success',
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
    <main className='tw-flex tw-flex-col tw-items-center tw-text-center tw-max-w-xs tw-mx-auto animate__animated animate__fadeIn'>
      {authorization && authorization.authorization ? (
         <>
         <h2 className='tw-pb-2 tw-border-b-2 tw-pt-6 tw-text-2xl tw-font-bold text-orange-donar'>Crear Donacion</h2>
         <form onSubmit={(e) => handleSubmit(e)} className='tw-space-y-4 tw-pt-4'>
           <Input name='donarRegister' placeholder='Titulo' />
           <select id='categoryRegister' className='tw-appearance-none tw-shadow tw-w-full tw-border tw-text-gray-700 tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline' required>
             <option value=''>Seleccionar Categoria</option>
             <option value='ropa'>Ropa</option>
             <option value='alimento'>Alimento no perecedero</option>
             <option value='mueble'>Mueble</option>
           </select>
           <textarea id='descriptionRegister' className='tw-resize-none tw-shadow tw-border tw-rounded focus:tw-outline-none focus:tw-shadow-outline tw-w-full tw-h-20 tw-p-2' placeholder='Descripcion del producto' />
           <input id='fileRegister' type='file' className='tw-appearance-none tw-shadow tw-w-full tw-border tw-text-gray-700 tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline' required />
           <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
             <Confetti active={activeConfetti} />
             <button className='bg-orange-donar tw-rounded tw-px-4 tw-py-1 tw-text-white tw-font-bold tw-text-lg tw-transform hover:tw-scale-110 tw-duration-200' type='submit'>¡Enviar!</button>
           </div>
         </form>
         </>
      ) : (
        <div className='pt-4'>
          <h2 className='tw-font-bold tw-text-lg tw-px-6'>¡Para poder publicar debe estar logueado!</h2>
          <div className='tw-space-y-5 tw-pt-6'>
            <div>
              <Link to='/iniciarSesion' className='bg-blue-donar hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Iniciar Sesion</Link>
            </div>
            <div>
              <Link to='/registrarse' className='bg-orange-donar hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>Registrarse</Link>
            </div>
          </div>
        </div>
    )}
    </main>
  );
};

export default Donar;
