import React from 'react';

const Producto = ({ image, alt, name, city }) => {
  return (
    <div className='tw-grid tw-grid-cols-12 tw-gap-4'>
      <div className='tw-col-span-4'>
        <img className='tw-object-contain tw-rounded' src={image} alt={alt} />
      </div>
      <div className='tw-col-span-8 tw-pt-4'>
        <h3 className='tw-font-bold tw-text-gray-800 tw-text-xl'>{name}</h3>
        <p className='tw-font-bold tw-text-gray-700 tw-text-sm'>{city}</p>
      </div>
    </div>
  );
};

export default Producto;
