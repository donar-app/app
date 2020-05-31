import React from 'react';

const Input = ({ type = 'text', placeholder, name, required = true }) => {
  return (
    <input className='tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline' name={name} id={name} type={type} placeholder={placeholder} required={required} />
  );
};

export default Input;
