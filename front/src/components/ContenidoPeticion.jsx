import React, { useState } from 'react';

const ContenidoPeticion = ({ usuario, peticion, authorization }) => {
  const { publicacion } = peticion;
  if (!publicacion) {
    return null;
  }
  const isOwnerPeticion = peticion.usuario_id === usuario._id;
  const isOwnerPublicacion = publicacion.anunciante_id === usuario._id;

  const DonacionEspera = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Aguarde mientras procesan su petición...
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Aceptar / Rechazar
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const DonacionAceptada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Su petición a sido aceptada, pongase en contacto con el donante...
          [ Donación Recibida ]
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz aceptado la petición, ahora ponte en contacto con el solicitante...
          [ Donación Entregada ]
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const DonacionRechazada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Su petición a sido rechazada : (
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz rechazado la petición.
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const DonacionRecibida = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Haz indicado que recibiste la donación.
          [ Calificar ]
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Han indicado que recibieron tu donación.
          [ Calificar / Marcar Recepción ]
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const DonacionEntregada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Han indicado que entregaron tu donación.
          [ Calificar / Marcar Recepción ]
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz indicado que entregaste la donación.
          [ Calificar ]
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const PeticionEspera = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Aguarde mientras procesan solicitud de donación...
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Aceptar / Rechazar
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  const PeticionAceptada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Han aceptado su solicitud de donación, ponte en contacto con el receptor...
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz aceptado la solicitud de donación, ahora ponte en contacto con el donante...
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };
  const PeticionRechazada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Su solicitud de donación a sido rechazada : (
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz rechazado la solicitud de donación
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };
  const PeticionRecibida = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Han indicado que entregaste la donación
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Haz indicado que recibiste la donación
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };
  const PeticionEntregada = () => {
    const ownerPeticion = () => (
      <>
        <div className=''>
          Haz indicado que entregaste tu donación
        </div>
      </>
    );
    const ownerPublicacion = () => (
      <>
        <div className=''>
          Han indicado que recibiste la donación
        </div>
      </>
    );

    if (isOwnerPeticion) {
      return ownerPeticion();
    }
    if (isOwnerPublicacion) {
      return ownerPublicacion();
    }
    return null;
  };

  if (peticion.es_rechazada) {
    return publicacion.tipo === 'Donación' ? <DonacionRechazada /> : <PeticionRechazada />;
  }
  if (peticion.es_entregada) {
    return publicacion.tipo === 'Donación' ? <DonacionEntregada /> : <PeticionEntregada />;
  }

  if (peticion.es_recibida) {
    return publicacion.tipo === 'Donación' ? <DonacionRecibida /> : <PeticionRecibida />;
  }

  if (peticion.es_aceptada) {
    return publicacion.tipo === 'Donación' ? <DonacionAceptada /> : <PeticionAceptada />;
  }

  return publicacion.tipo === 'Donación' ? <DonacionEspera /> : <PeticionEspera />;

};

export default ContenidoPeticion;
