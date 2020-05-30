'use strict';

let ComentarioPublicacion = require('../models/comentarioPublicacion')

const createComentarioPublication = async (comentarioPublicacionObject) => {
    let comentarioPublicacion = new ComentarioPublicacion( comentarioPublicacionObject );

    return await comentarioPublicacion.save();
}

const updateComentarioPublication = async (id, comentarioPublicacion) => {
    return await ComentarioPublicacion.findOneAndUpdate(
        {_id: id}, 
        comentarioPublicacion, 
        { 
            new: true, 
            runValidators: true, 
            context: 'query'
        }
    );
}

module.exports = {
    createComentarioPublication,
    updateComentarioPublication,
}