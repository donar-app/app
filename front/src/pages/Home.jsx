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

  return (
    <main className='animate__animated animate__fadeIn'>
      <div className='tw-relative'>
        <img className='tw-object-cover tw-h-12 md:tw-h-40 tw-w-full opacity-80' src={donando} alt='' />
        <div className='tw-absolute tw-px-5 tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <p className='tw-pb-3 tw-font-bold tw-text-lg tw-text-white md:tw-text-4xl text-shadow'>
            Dona o solicita lo que (no) necesites!
          </p>
        </div>
      </div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='solicitudes'>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey='donaciones'>
                <SliderProduct smallText='Recibé una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Donación'; })}>Donaciones</SliderProduct>
              </Tab.Pane>
              <Tab.Pane eventKey='solicitudes'>
                <SliderProduct smallText='Solicita una donación' productos={!Array.isArray(productos) ? null : productos.filter((producto) => { return producto.tipo === 'Solicitud'; })}>Solicitudes de donaciones</SliderProduct>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <div className='shadow' style={{ bottom: '0', left: '0', position: 'fixed', width: '100vw', backgroundColor: 'white' }}>
            <Nav variant='pills' className='tw-flex tw-justify-center tw-items-center'>
              <Nav.Item className='w-2/12'>
                <Nav.Link eventKey='donaciones' className='text-center'>
                  <center>
                    <MdThumbsUp fontSize='2em' />
                  </center>
                  Donaciones
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='w-2/12'>
                <Nav.Link eventKey='solicitudes'>
                  <center>
                    <IosMegaphone fontSize='2em' />
                  </center>
                  Solicitudes
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Row>
      </Tab.Container>

      {/* <SliderPeticion smallText='Tus Peticiones' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return true; })}>Peticiones</SliderPeticion> */}

    </main>
  );
};

export default Home;
