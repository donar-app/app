import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Publicar = ({ authorization }) => {
  const history = useHistory();

  const goTo = (path) => {
    history.push(`/publicar/${path}`);
  };

  return (
    <main className='tw-text-center animate__animated animate__fadeIn'>
      {authorization && authorization.authorization ? (
        <>
          <h2 className='tw-text-2xl tw-font-bold tw-text-gray-700 tw-pt-8'>¿Que desea hacer?</h2>
          <div className='tw-pt-10 tw-space-y-6 tw-text-white tw-px-10'>
            <div>
              <button type='button' onClick={() => goTo('donar')} className='tw-text-lg tw-font-bold bg-orange-donar tw-py-2 tw-max-w-xs tw-w-full tw-rounded tw-transform tw-duration-200 hover:tw-scale-110'>¡Me gustaría donar!</button>
            </div>
            <div>
              <button type='button' onClick={() => goTo('solicitar')} className='tw-text-lg tw-font-bold bg-blue-donar tw-py-2 tw-max-w-xs tw-w-full tw-rounded tw-transform tw-duration-200 hover:tw-scale-110'>¡Quiero Solicitar!</button>
            </div>
          </div>
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

export default Publicar;
