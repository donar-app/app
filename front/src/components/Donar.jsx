import React from 'react';
import Input from './Input';
import ButtonPill from './ButtonPill';

const Donar = () => {
  return (
    <div>
      <Input>Indica que quieres donar</Input>
      <Input>Describela</Input>
      <Input type='file'>Adjunta fotos (opcional)</Input>
      <Input>Opciones de entrega</Input>
      <div className='tw-text-center pt-4'>
        <ButtonPill px='tw-px-6' py='tw-py-0' bgColor='bg-orange-donar'>Donar</ButtonPill>
      </div>
    </div>
  );
};

export default Donar;
