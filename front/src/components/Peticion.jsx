import React, { useState } from 'react';
import IosSendOutline from 'react-ionicons/lib/IosSendOutline';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import LoaderDualRing from './LoaderDualRing';
import { petition } from '../functions';
import ContenidoPeticion from './ContenidoPeticion';

const Peticion = ({ usuario, peticion, authorization }) => {
  if (!peticion.publicacion) {
    return null;
  }

  const { publicacion } = peticion;
  const imagen = `https://api.donar-app.com/uploads/${publicacion.imagen}`;

  const history = useHistory();
  const isOwner = false;//usuario && usuario.id === peticion.publicacion.anunciante_id;

  const getEstado = () => {
    let estado = publicacion.tipo === 'Donación' ? 'Petición En Espera' : 'Donación  En Espera';

    if (peticion.es_aceptada) {
      estado = publicacion.tipo === 'Donación' ? 'Petición Aceptada' : 'Donación Aceptada';
    }

    if (peticion.es_recibida) {
      estado = publicacion.tipo === 'Donación' ? 'Petición Recibida' : 'Donación Recibida';
    }

    if (peticion.es_entregada) {
      estado = publicacion.tipo === 'Donación' ? 'Petición Entregada' : 'Donación Entregada';
    }

    if (peticion.es_rechazada) {
      estado = publicacion.tipo === 'Donación' ? 'Petición Rechazada' : 'Donación Rechazada';
    }

    return estado;
  };

  return (
    <div className='tw-mx-5 tw-my-5'>
      <div className='tw-rounded tw-shadow-md tw-bg-white ' key={peticion._id}>
        <h3 style={{ backgroundColor: '#0571bc', color: 'white' }} className='tw-pl-4 tw-py-2'>{ publicacion.titulo }</h3>
        <div className='tw-inline-flex'>
          <div className='tw-inline-flex'>
            <img className='tw-object-contain tw-ml-5 tw-object-center tw-rounded-full tw-h-32 tw-w-32 tw-p-1 shadow-left tw-bg-white' src={imagen} alt={publicacion.titulo} />
            <div>
              {
                peticion && peticion.calificacion_anunciante && (
                  <p className='tw-text-xs'>
                    Calificación Anunciante:
                    {' '}
                    {peticion.calificacion_anunciante}
                  </p>
                )
              }
              {
                peticion && peticion.calificacion_peticion && (
                  <p className='tw-text-xs'>
                    Calificación Petición:
                    {' '}
                    {peticion.calificacion_peticion}
                  </p>
                )
              }
            </div>
            <ContenidoPeticion peticion={peticion} usuario={usuario} authorization={authorization} />
          </div>
        </div>
        <div className='tw-inline-flex tw-py-1 tw-pl-5' style={{ width: '100%', backgroundColor: '#dd7f0e' }}>
          { getEstado() }
        </div>
      </div>
      {(
        peticion && peticion.actualizado_en && (
          <p className='tw-text-xs'>
            Cambio:
            {' '}
            {moment(peticion.actualizado_en).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        )) || (
        peticion && peticion.creado_en && (
          <p className='tw-text-xs'>
            Creación:
            {' '}
            {moment(peticion.creado_en).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        )
      )}
    </div>
  );
};

export default Peticion;
