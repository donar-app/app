import React from 'react';
import ButtonPill from '../components/ButtonPill';

const Home = () => {
  return (
    <main>
      <div className='tw-relative'>
        <img src='' alt='' />
        <div className='tw-absolute tw-text-center'>
          <p className='pb-3'>
            !Podés ayudar mucho donando algo que no usas!
          </p>
          <ButtonPill bgColor='bg-red-donar'>Quienes somos</ButtonPill>
        </div>
      </div>
      <div>
        <h2>¿Donar o solicitar?</h2>
        <div>
          <p>Publica lo que tenes para donar o elige en las solicitudes</p>
          <ButtonPill bgColor='bg-orange-donar'>Donaciones</ButtonPill>
        </div>
      </div>
      <div />
      <div />
    </main>
  );
};

export default Home;
