import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tabs, Tab, Nav, Row, Col } from 'react-bootstrap';
import IosHandOutline from 'react-ionicons/lib/IosHandOutline';
import MdDoneAll from 'react-ionicons/lib/MdDoneAll';
import donando from '../assets/static/donando.png';
import ButtonPill from '../components/ButtonPill';
import SliderProduct from '../components/SliderProduct';
import Preguntas from '../components/Preguntas';
import SliderPeticion from '../components/SliderPeticion';
import { petition, checkLogin } from '../functions';

const Conversaciones = ({ authorization }) => {
  const history = useHistory();
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!checkLogin()) {
        Swal.fire(
          'No Autorizado',
          'Inicie sesión para continuar',
          'error',
        );

        history.push('/iniciarSesion');
      }

      // Traer Preguntas
      petition('preguntas/mis-preguntas', 'GET', authorization.authorization)
        .then((response) => {
          if (response.tipo === 'error' || response.message === 'Internal Server Error') {
            const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar para ver las preguntas';
            Swal.fire(
              'Error al traer las preguntas',
              mensaje,
              'error',
            );
            if (response.codigo === 'token_no_valido') {
              history.push('/iniciarSesion');
            }
          } else {
            const { cuerpo: data } = response;
            const preguntas = [];

            data.forEach((element, i) => {
              preguntas.push({
                ...element,
              // imagen: `https://api.donar-app.com/uploads/${data[i].imagen}`,
              });
            });
            setPreguntas(preguntas);
          }
        })
        .catch((error) => console.error({ error }));

      // Traer Preguntas
      petition('preguntas/mis-respuestas', 'GET', authorization.authorization)
        .then((response) => {
          if (response.tipo === 'error' || response.message === 'Internal Server Error') {
            const mensaje = response.mensaje || 'Espere unos minutos y vuelva a intentar para ver las respuestas';
            Swal.fire(
              'Error al traer las respuestas',
              mensaje,
              'error',
            );
            if (response.codigo === 'token_no_valido') {
              history.push('/iniciarSesion');
            }
          } else {
            const { cuerpo: data } = response;
            const respuestas = [];

            data.forEach((element, i) => {
              respuestas.push({
                ...element,
                // imagen: `https://api.donar-app.com/uploads/${data[i].imagen}`,
              });
            });
            setRespuestas(respuestas);
          }
        })
        .catch((error) => console.error({ error }));
    };
    getData();
  }, []);

  const [tab, setTab] = useState('preguntas');

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

        <div style={{ display: tab === 'preguntas' ? 'block' : 'none' }}>
          <Preguntas smallText='Tus preguntas realizadas' preguntas={preguntas} authorization={authorization}>Preguntas</Preguntas>
        </div>
        <div style={{ display: tab === 'respuestas' ? 'block' : 'none' }}>
          <Preguntas smallText='Tus preguntas realizadas' preguntas={respuestas} authorization={authorization}>Respuestas</Preguntas>
        </div>
      </main>
      <ul className='tw-flex tw-shadow' style={{ bottom: '0', left: '0', position: 'fixed', width: '100vw', backgroundColor: 'white' }}>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('preguntas')} className={tab === 'preguntas' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <IosHandOutline fontSize='2em' />
              Preguntas
            </center>
          </a>
        </li>
        <li className='tw-flex-1 tw-mr-2'>
          <a onClick={() => setTab('respuestas')} className={tab === 'respuestas' ? tabActive : tabInactive} href='javscript:void(0)'>
            <center>
              <MdDoneAll fontSize='2em' />
              Respuestas
            </center>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Conversaciones;
