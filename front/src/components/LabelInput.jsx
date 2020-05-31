import React from 'react';

const Input = ({ children, name, type = 'text', placeholder, required = true }) => {
  return (
    <label className='tw-block' htmlFor={name}>
      <p className='tw-font-bold pb-1'>{children}</p>
      <input className='tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline' type={type} name={name} id={name} placeholder={placeholder} required={required} />
    </label>
  );
};

export default Input;
