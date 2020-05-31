import React from 'react';
import { Link } from 'react-router-dom';
import Producto from '../components/Producto';
import remeraGris from '../assets/static/remeraGris.jpg';
import '../assets/styles/Publicaciones.css';

const Publicaciones = () => {
  return (
    <main className='pt-2 animate__animated animate__fadeIn'>
      <div className='tw-pb-2 tw-px-2'>
        <input className='tw-placeholder-black tw-shadow tw-appearance-none tw-border tw-rounded-full tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline' type='text' placeholder='Estoy buscando...' />
      </div>
      <div className='tw-grid tw-grid-cols-2 tw-text-center tw-divide-x-2 tw-border-t-2'>
        <div className='tw-border-b-2'>
          <button className='text-orange-donar' type='button'>donaciones</button>
        </div>
        <div className='tw-border-b-2'>
          <button className='text-yellow-donar' type='button'>solicitudes</button>
        </div>
        <div className='tw-col-span-2'>
          <Link to='/publicar' className='tw-font-bold tw-text-gray-700 tw-text-lg'>Publicar</Link>
        </div>
      </div>
      <div className='tw-pt-4'>
        <Producto image={remeraGris} name='Remera Gris' city='Capital Federal' />
      </div>
    </main>
  );
};

export default Publicaciones;
