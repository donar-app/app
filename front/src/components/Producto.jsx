import React from 'react';

const Producto = ({ image, alt, name }) => {
  return (
    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-border-2 tw-rounded'>
      <img className='tw-object-contain tw-object-center tw-rounded-full tw-h-16 tw-w-16 tw-p-1 shadow-left' src={image} alt={alt} />
      <div className='tw-text-center tw-leading-snug tw-p-1 tw-w-full'>
        <h3 className='tw-font-bold tw-text-gray-800 tw-text-sm'>{name}</h3>
        <p className='tw-font-bold tw-text-xs text-orange-donar'>Más detalles</p>
      </div>
    </div>
  );
};

export default Producto;
