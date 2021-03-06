import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import SliderProduct from '../components/SliderProduct';
import { petition } from '../functions';

const Home = ({ authorization }) => {
  const history = useHistory();
  const [productos, setproductos] = useState(null);

  const goTo = (path) => {
    history.push(`${path}`);
  };

  useEffect(() => {
    petition('publicaciones', 'GET')
      .then((response) => {
        if (response.tipo === 'error' || response.message === 'Internal Server Error') {
          const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar para ver las publicaciones';
          Swal.fire(
            'Error al traer las publicaciones',
            mensaje,
            'error',
          );
        } else {
          const { cuerpo } = response;

          const productos = [];
          cuerpo.forEach((publicacion, i) => {
            console.log({ publicacion });
            productos.push({
              ...publicacion,
              imagen: `https://api.donar-app.com/uploads/${publicacion.imagen}`,
            });
          });
          // console.log(response);
          setproductos(productos);
        }
      });
  }, []);

  return (
    <main className='animate__animated animate__fadeIn'>
      <div className='tw-relative'>
        <img className='tw-object-cover tw-h-12 md:tw-h-40 tw-w-full opacity-80' src={donando} alt='' />
        <div className='tw-absolute tw-px-5 tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <p className='tw-pb-3 tw-font-bold tw-text-lg tw-text-white md:tw-text-4xl text-shadow'>
            Dona o solicita lo que (no) necesites!
          </p>
          {/* <div className='tw-text-right tw-w-full md:tw-text-center'>
            <ButtonPill bgColor='tw-bg-white' textColor='text-orange-donar' px='tw-px-6' py='tw-py-0' textSize='tw-text-2xl' handleClick={() => goTo('/publicar/donar')}>Donar</ButtonPill>
          </div> */}
        </div>
      </div>
      <SliderProduct smallText='Recibé una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Donación'; })}>Donaciones</SliderProduct>
      <SliderProduct smallText='Solicita una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Solicitud'; })}>Solicitudes de donaciones</SliderProduct>
    </main>
  );
};

export default Home;
