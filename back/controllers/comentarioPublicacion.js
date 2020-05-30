'use strict';

const createComentarioPublication = async (comentarioPublicacion) => {
    return {
        _id: 1,
        pregunta: '¿Está disponible?',
        respuesta: null,
        donacion_id: 1,
        usuario_id: 1,
    };
}

const updateComentarioPublication = async (id, comentarioPublicacion) => {
    return {
        _id: 1,
        pregunta: '¿Está disponible?',
        respuesta: 'Si, está disponible!',
        donacion_id: 1,
        usuario_id: 1,
    };
}

module.exports = {
    createComentarioPublication,
    updateComentarioPublication,
}