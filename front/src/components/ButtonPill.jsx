import React from 'react';

const ButtonPill = ({ bgColor = 'bg-red-donar', children }) => {
  return (
    <button type='button' className={`tw-rounded-full ${bgColor} tw-text-white tw-px-2 tw-py-1`}><p className='tw-mb-1'>{children}</p></button>
  );
};

export default ButtonPill;
