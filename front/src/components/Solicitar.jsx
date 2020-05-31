import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import Input from './Input';

const Solicitar = () => {
  const [activeConfetti, setActiveConfetti] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveConfetti(true);
  };

  return (
    <main className='tw-flex tw-flex-col tw-items-center tw-max-w-xs tw-mx-auto'>
      <h2 className='tw-pb-2 tw-border-b-2 tw-pt-6 tw-text-2xl tw-font-bold text-blue-donar'>Solicitar Donacion</h2>
      <form onSubmit={(e) => handleSubmit(e)} className='tw-space-y-4 tw-pt-4'>
        <Input placeholder='Titulo' />
        <select className='tw-appearance-none tw-shadow tw-w-full tw-border tw-text-gray-700 tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline'>
          <option value=''>Seleccionar Categoria</option>
          <option value='ropa'>Ropa</option>
          <option value='alimento'>Alimento no perecedero</option>
          <option value='mueble'>Mueble</option>
        </select>
        <textarea className='tw-resize-none tw-shadow tw-border tw-rounded focus:tw-outline-none focus:tw-shadow-outline tw-w-full tw-h-20 tw-p-2' placeholder='Descripcion del producto' />
        <textarea className='tw-resize-none tw-shadow tw-border tw-rounded focus:tw-outline-none focus:tw-shadow-outline tw-w-full tw-h-20 tw-p-2' placeholder='Descripcion de envio' />
        <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <Confetti active={activeConfetti} />
          <button className='bg-blue-donar tw-rounded tw-px-4 tw-py-1 tw-text-white tw-font-bold tw-text-lg tw-transform hover:tw-scale-110 tw-duration-200' type='submit'>¡Enviar!</button>
        </div>
      </form>
    </main>
  );
};

export default Solicitar;
