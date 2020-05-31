import React from 'react';

const Producto = ({ image, alt, name, city }) => {
  return (
    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-border-2 tw-rounded'>
      <img className='tw-object-contain tw-object-center tw-rounded tw-h-16 tw-w-16 tw-p-1' src={image} alt={alt} />
      <div className='tw-text-center tw-leading-snug tw-border-t-2 tw-p-1 tw-w-full'>
        <h3 className='tw-font-bold tw-text-gray-800 tw-text-sm'>{name}</h3>
        <p className='tw-font-bold tw-text-gray-700 tw-text-xs'>{city}</p>
      </div>
    </div>
  );
};

export default Producto;
