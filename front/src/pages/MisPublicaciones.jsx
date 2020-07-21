import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tabs, Tab, Nav, Row, Col } from 'react-bootstrap';
import MdThumbsUp from 'react-ionicons/lib/MdThumbsUp';
import IosMegaphone from 'react-ionicons/lib/IosMegaphone';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import SliderProduct from '../components/SliderProduct';
import SliderPeticion from '../components/SliderPeticion';
import { petition } from '../functions';

const MisPublicaciones = ({ authorization }) => {
  const history = useHistory();
  const [publicaciones, setPublicaciones] = useState(null);

  useEffect(() => {

    petition('usuarios', 'GET', authorization.authorization, {})
      .then((response) => {
        if (response.tipo === 'error') {
          if (response.codigo === 'token_no_valido') {
            Swal.fire(
              'No Autorizado',
              response.mensaje,
              'error',
            );
          }
          history.push('/iniciarSesion');
          return;
        }
        console.log({ response });
        const { cuerpo: usuario } = response;

        // Traer publicaciones
        petition('publicaciones/mis-publicaciones', 'GET', authorization.authorization)
          .then((response) => {
            if (response.tipo === 'error' || response.message === 'Internal Server Error') {
              const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar para ver las publicaciones';
              Swal.fire(
                'Error al traer las publicaciones',
                mensaje,
                'error',
              );
            } else {
              const { cuerpo: data } = response;
              const publicaciones = [];

              data.forEach((element, i) => {
                publicaciones.push({
                  ...element,
                  imagen: `https://api.donar-app.com/uploads/${data[i].imagen}`,
                });
              });
              console.log({ publicaciones });
              setPublicaciones(publicaciones);
            }
          });
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
              Verifica tu actividad
            </p>
          </div>
        </div>
        {/* <Tab.Container id='left-tabs-example' defaultActiveKey='donaciones'>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey='donaciones'>
                <SliderProduct smallText='Tus donaciones' productos={!Array.isArray(publicaciones) ? null : publicaciones.filter((publicacion) => { return publicacion.tipo === 'Donación'; })}>Donaciones</SliderProduct>
              </Tab.Pane>
              <Tab.Pane eventKey='solicitudes'>
                <SliderProduct smallText='Tus solicitudes' productos={!Array.isArray(publicaciones) ? null : publicaciones.filter((publicacion) => { return publicacion.tipo === 'Solicitud'; })}>Solicitudes</SliderProduct>
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
      </Tab.Container> */}

        {/* <SliderPeticion smallText='Tus Peticiones' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return true; })}>Peticiones</SliderPeticion> */}
        <div style={{ display: tab === 'donaciones' ? 'block' : 'none' }}>
          <SliderProduct smallText='Tus donaciones' productos={!Array.isArray(publicaciones) ? null : publicaciones.filter((publicacion) => { return publicacion.tipo === 'Donación'; })}>Donaciones</SliderProduct>
        </div>
        <div style={{ display: tab === 'solicitudes' ? 'block' : 'none' }}>
          <SliderProduct smallText='Tus solicitudes' productos={!Array.isArray(publicaciones) ? null : publicaciones.filter((publicacion) => { return publicacion.tipo === 'Solicitud'; })}>Solicitudes</SliderProduct>
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

export default MisPublicaciones;
