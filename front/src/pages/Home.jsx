import React from 'react';
import { useHistory } from 'react-router-dom';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import SliderProduct from '../components/SliderProduct';

const Home = () => {
  const history = useHistory();

  const goTo = (path) => {
    history.push(`${path}`);
  };

  return (
    <main className='animate__animated animate__fadeIn'>
      <div className='tw-relative'>
        <img className='tw-object-cover tw-h-40 tw-w-full md:tw-rounded opacity-80' src={donando} alt='' />
        <div className='tw-absolute tw-px-5 tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <p className='tw-pb-3 tw-font-bold tw-text-lg tw-text-white md:tw-text-4xl text-shadow'>
            Publica lo que tenes para donar o elegí en las solicitudes
          </p>
          <div className='tw-text-right tw-w-full'>
            <ButtonPill bgColor='tw-bg-white' textColor='text-orange-donar' px='tw-px-6' py='tw-py-0' textSize='tw-text-2xl' handleClick={() => goTo('/publicar/donar')}>Donar</ButtonPill>
          </div>
        </div>
      </div>
      <SliderProduct smallText='Dona lo que tenes o recibi ayuda'>Donaciones</SliderProduct>
      <SliderProduct smallText='Dona lo que tenes o recibi ayuda'>Solicitudes de donaciones</SliderProduct>
    </main>
  );
};

export default Home;
