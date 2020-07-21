import React, { useState } from 'react';

const ContenidoPeticion = ({ usuario, peticion, authorization }) => {
  const { publicacion } = peticion;
  if (!publicacion) {
    return null;
  }

  const DonacionEspera = () => {
    return <>Donación En Espera</>;
  };
  const DonacionAceptada = () => {
    return <>Donación Aceptada</>;
  };
  const DonacionRechazada = () => {
    return <>Donación Rechazada</>;
  };
  const DonacionRecibida = () => {
    return <>Donación Recibida</>;
  };
  const DonacionEntregada = () => {
    return <>Donación Entregada</>;
  };

  const PeticionEspera = () => {
    return <>Petición En Espera</>;
  };

  const PeticionAceptada = () => {
    return <>Petición Aceptada</>;
  };
  const PeticionRechazada = () => {
    return <>Petición Rechazada</>;
  };
  const PeticionRecibida = () => {
    return <>Petición Recibida</>;
  };
  const PeticionEntregada = () => {
    return <>Petición Entregada</>;
  };

  if (peticion.es_aceptada) {
    return publicacion.tipo === 'Donación' ? <DonacionAceptada /> : <PeticionAceptada />;
  }

  if (peticion.es_recibida) {
    return publicacion.tipo === 'Donación' ? <DonacionRecibida /> : <PeticionRecibida />;
  }

  if (peticion.es_entregada) {
    return publicacion.tipo === 'Donación' ? <DonacionEntregada /> : <PeticionEntregada />;
  }

  if (peticion.es_rechazada) {
    return publicacion.tipo === 'Donación' ? <DonacionRechazada /> : <PeticionRechazada />;
  }
  return publicacion.tipo === 'Donación' ? <DonacionEspera /> : <PeticionEspera />;

};

export default ContenidoPeticion;
