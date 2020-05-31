import React, { useRef } from 'react';
import Slider from 'react-slick';
import Producto from './Producto';
import remeraGris from '../assets/static/remeraGris.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/slickStyle.css';

const buttonStyle = {
  color: "#0170bc"
};

const SliderProduct = ({ smallText, children }) => {
  const settings = useRef({
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  });
  return (
    <div className='tw-px-2 tw-pt-5'>
      <div className='leading-tight tw-pb-2'>
        <h2 className='tw-text-xl tw-font-bold text-orange-donar'>{children}</h2>
        <p className='tw-font-bold tw-text-gray-800 tw-text-sm'>{smallText}</p>
      </div>
      <div className='tw-overflow-x-hidden'>
        <Slider {...settings.current}>
          <div>
            <Producto image={remeraGris} name='Remera Gris' city='Capital Federal' />
          </div>
          <div>
            <Producto image={remeraGris} name='Remera Gris' city='Capital Federal' />
          </div>
          <div>
            <Producto image={remeraGris} name='Remera Gris' city='Capital Federal' />
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
        </Slider>
      </div>
      <div className='tw-text-right pr-2 pt-2'>
        <button type='button' className='tw-font-bold' style={buttonStyle}>{">"}</button>
      </div>
    </div>
  );
};

export default SliderProduct;
