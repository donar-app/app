import React from 'react';
import Layout from '../components/Layout';
import donando from '../assets/static/donando.png';
import dar from '../assets/static/dar.png';
import caja from '../assets/static/caja.png';

const Home = () => {
  return (
    <main className='animate__animated animate__fadeIn'>
      <div>
        <Layout image={donando} buttonColor='bg-red-donar' buttonText='Quienes somos' position='tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center' textColor='tw-text-white' fontSize='md:tw-text-4xl'>
          ¡Podés ayudar mucho donando algo que no usas!
        </Layout>
      </div>
      <div className='md:tw-grid md:tw-grid-cols-2 md:tw-gap-4 md:tw-pt-2'>
        <div>
          <h2 className='tw-text-center tw-text-gray-700 tw-font-bold tw-text-3xl md:tw-text-2xl lg:tw-text-3xl tw-py-3 md:tw-leading-tight'>¿Donar o solicitar?</h2>
          <Layout image={dar} buttonColor='bg-orange-donar' buttonText='Donaciones'>
            Publica lo que tenes para donar o elige en las solicitudes
          </Layout>
        </div>
        <div>
          <h2 className='tw-uppercase tw-text-center text-blue-donar tw-font-bold tw-text-3xl md:tw-text-2xl lg:tw-text-3xl tw-py-3 tw-leading-none md:tw-leading-tight'>Entre todos nos ayudamos</h2>
          <Layout image={caja} buttonColor='bg-yellow-donar' buttonText='Solicitudes'>
            Publica lo que necesitas o elige en donaciones disponibles
          </Layout>
        </div>
      </div>
      <div className='md:tw-pt-4'>
        <h2 className='tw-font-bold tw-text-xl tw-text-center tw-text-4xl tw-text-gray-700'>Registrate acá</h2>
        <div>
          <img src='tw-object-contain' alt='' />
        </div>
      </div>
    </main>
  );
};

export default Home;
