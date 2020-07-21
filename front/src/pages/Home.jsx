import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tabs, Tab, Nav, Row, Col } from 'react-bootstrap';
import IosFlaskOutline from 'react-ionicons/lib/IosFlaskOutline';
import MdThumbsUp from 'react-ionicons/lib/MdThumbsUp';
import IosMegaphone from 'react-ionicons/lib/IosMegaphone';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import Peticiones from '../components/Peticiones';
import { petition } from '../functions';
import SliderProduct from '../components/SliderProduct';

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
  const [tab, setTab] = useState('donaciones');

  const tabActive = 'tw-text-center tw-block tw-border tw-border-blue-500 tw-rounded tw-py-2 tw-px-4 tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white';
  const tabInactive = 'tw-text-center tw-block tw-border tw-border-white tw-rounded tw-hover:border-gray-200 tw-text-blue-500 tw-hover:bg-gray-200 tw-py-2 tw-px-4';
  return (
    <>
      <main className='animate__animated animate__fadeIn'>
        <div className='tw-relative'>
          <img className='tw-object-cover tw-h-12 md:tw-h-40 tw-w-full opacity-80' src={donando} alt='' />
          <div className='tw-absolute tw-px-5 tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-center'>
            <p className='tw-pb-3 tw-font-bold tw-text-lg tw-text-white md:tw-text-4xl text-shadow'>
              Dona o solicita lo que (no) necesites!
            </p>
          </div>
        </div>

        <div style={{ display: tab === 'donaciones' ? 'block' : 'none' }}>
          <SliderProduct smallText='Recibé una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Donación'; })}>Donaciones</SliderProduct>
        </div>
        <div style={{ display: tab === 'solicitudes' ? 'block' : 'none' }}>
          <SliderProduct smallText='Solicita una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Solicitud'; })}>Solicitudes de donaciones</SliderProduct>
        </div>
      </main>

      <ul className='tw-flex tw-shadow' style={{ bottom: '0', left: '0', position: 'fixed', width: '100vw', backgroundColor: 'white' }}>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('donaciones')} className={tab === 'donaciones' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <MdThumbsUp fontSize='2em' />
              Donaciones
            </center>
          </a>
        </li>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('solicitudes')} className={tab === 'solicitudes' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <IosMegaphone fontSize='2em' />
              Solicitudes
            </center>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Home;
