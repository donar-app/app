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

  const [tab, setTab] = useState('encurso');

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
        <div style={{ display: tab === 'encurso' ? 'block' : 'none' }}>
          <Peticiones smallText='En Curso' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return peticion; })}>Peticiones</Peticiones>
        </div>
        <div style={{ display: tab === 'historial' ? 'block' : 'none' }}>
          <Peticiones smallText='Historial' peticiones={!Array.isArray(peticiones) ? null : peticiones.filter((peticion) => { return peticion; })}>Peticiones</Peticiones>
        </div>
      </main>
      <ul className='tw-flex tw-shadow' style={{ bottom: '0', left: '0', position: 'fixed', width: '100vw', backgroundColor: 'white' }}>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('encurso')} className={tab === 'encurso' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <IosFlaskOutline fontSize='2em' />
              En Curso
            </center>
          </a>
        </li>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('historial')} className={tab === 'historial' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <MdRefresh fontSize='2em' />
              Historial
            </center>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Entregas;
