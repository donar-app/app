import React from 'react';

const imgItemStyle = {
  "border-radius": "50%",
  "box-shadow": "-2px 1px 1px #a0a0a08c"
};

const aStyle = {
  color: "#dd7e14"
};

const Producto = ({ image, alt, name, city }) => {
  return (
    <div className='tw-flex tw-flex-col tw-justify-center tw-items-center'>
      <img className='tw-object-contain tw-object-center tw-rounded-full tw-h-16 tw-w-16 tw-p-1 tw-rounded-full tw-flex' style={imgItemStyle} src={image} alt={alt} />
      <div className='tw-text-center tw-leading-snug tw-p-1 tw-w-full'>
        <h3 className='tw-font-bold tw-text-gray-800 tw-text-sm'>{name}</h3>
        <a className='tw-font-bold tw-text-xs' href='#' style={aStyle}>Ver Más</a>
      </div>
    </div>
  );
};

export default Producto;
