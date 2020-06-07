import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Producto from './Producto';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/slickStyle.css';
import imagen1 from '../assets/static/remeraGris.jpg';

const SliderProduct = ({ smallText, children, productos }) => {
  const settings = useRef({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  });
  return (
    <div className='tw-px-2 tw-pt-5'>
      <div className='leading-tight tw-pb-2'>
        <h2 className='tw-text-xl tw-font-bold text-orange-donar'>{children}</h2>
        <p className='tw-font-bold tw-text-gray-800 tw-text-sm'>{smallText}</p>
      </div>
      <div className='tw-overflow-x-hidden'>
        <Slider {...settings.current}>
          { productos && productos.map((producto) => {
            const { _id, imagen, titulo } = producto;
            return (
              <div key={_id}>
                <Link to={`/publicacion/${_id}`}>
                  <Producto image={imagen} name={titulo} />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
      {/*<div className='tw-text-right pr-2 pt-2'>
        <button type='button' className='tw-font-bold tw-text-gray-700'>Ver más ...</button>
        </div>*/}
    </div>
  );
};

export default SliderProduct;
