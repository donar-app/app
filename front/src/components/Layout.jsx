import React from 'react';
import ButtonPill from './ButtonPill';

const Layout = ({ buttonColor, buttonText, children, image = '', alt = '', position = 'tw-pt-8 tw-pr-20 md:tw-flex md:tw-flex-col md:tw-justify-center', textColor = 'tw-text-gray-800', fontSize = 'lg:tw-text-2xl' }) => {
  return (
    <div className='tw-relative'>
      <img className='tw-object-contain tw-w-full md:tw-rounded' src={image} alt={alt} />
      <div className={`tw-absolute tw-px-5 tw-inset-0 ${position}`}>
        <p className={`tw-pb-3 tw-font-bold tw-text-lg ${fontSize} ${textColor}`}>{children}</p>
        <div>
          <ButtonPill bgColor={buttonColor}>{buttonText}</ButtonPill>
        </div>
      </div>
    </div>
  );
};

export default Layout;
