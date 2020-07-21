import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tabs, Tab, Nav, Row, Col } from 'react-bootstrap';
import IosFlaskOutline from 'react-ionicons/lib/IosFlaskOutline';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import Peticiones from '../components/Peticiones';
import { petition } from '../functions';

;

const Entregas = ({ authorization }) => {
  const history = useHistory();
  const [peticiones, setPeticiones] = useState(null);

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

        // Traer peticiones
        petition('peticiones', 'GET', authorization.authorization)
          .then((response) => {
            if (response.tipo === 'error' || response.message === 'Internal Server Error') {
              const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar para ver las peticiones';
              Swal.fire(
                'Error al traer las peticiones',
                mensaje,
                'error',
              );
            } else {
              const { cuerpo: data } = response;
              const peticiones = [];

              data.forEach((element, i) => {
                peticiones.push({
                  ...element,
                });
              });

              setPeticiones(peticiones);
            }
          });
      });
  }, []);

  return (
    <main className='animate__animated animate__fadeIn'>
      <div className='tw-relative'>
        <img className='tw-object-cover tw-h-12 md:tw-h-40 tw-w-full opacity-80' src={donando} alt='' />
        <div className='tw-absolute tw-px-5 tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-center'>
          <p className='tw-pb-3 tw-font-bold tw-text-lg tw-text-white md:tw-text-4xl text-shadow'>
            Verifica tu actividad
          </p>
        </div>
      </div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='donaciones' transition={false}>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey='donaciones'>
                <Peticiones smallText='En Curso' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return peticion; })}>Peticiones</Peticiones>
              </Tab.Pane>
              <Tab.Pane eventKey='solicitudes'>
                <Peticiones smallText='Historial' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return peticion; })}>Peticiones</Peticiones>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col sm={12} style={{ bottom: '0', position: 'fixed', width: '100vw' }}>
            <Nav variant='pills' className='tw-flex tw-justify-center tw-items-center'>
              <Nav.Item className='w-2/5'>
                <Nav.Link eventKey='donaciones' className='text-center'>
                  <center>
                    <IosFlaskOutline fontSize='3em' />
                  </center>
                  En Proceso
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='w-2/5'>
                <Nav.Link eventKey='solicitudes'>
                  <center>
                    <MdRefresh fontSize='3em' />
                  </center>
                  Historial
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>

      {/* <SliderPeticion smallText='Tus Peticiones' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return true; })}>Peticiones</SliderPeticion> */}

    </main>
  );
};

export default Entregas;
