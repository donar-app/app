'use strict';

let ComentarioPublicacion = require('../models/comentarioPublicacion')

const createComentarioPublication = async (comentarioPublicacionObject) => {
    let comentarioPublicacion = new ComentarioPublicacion( comentarioPublicacionObject );

    return await comentarioPublicacion.save();
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