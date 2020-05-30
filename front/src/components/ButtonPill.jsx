import React from 'react';

const ButtonPill = ({ bgColor = 'bg-red-donar', px = 'tw-px-2', children, py = 'tw-py-1' }) => {
  return (
    <button type='button' className={`tw-rounded-full ${bgColor} tw-text-white ${px} ${py} tw-transform hover:tw-scale-110 tw-font-bold tw-duration-150`}><p className='tw-mb-1 xl:tw-text-2xl'>{children}</p></button>
  );
};

export default ButtonPill;
