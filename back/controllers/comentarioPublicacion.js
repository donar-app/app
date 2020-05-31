'use strict';

let ComentarioPublicacion = require('../models/comentarioPublicacion')

const getComentariosPublicationes = async (id) => {

    try {
        let resp = await ComentarioPublicacion.find( {publicacion_id: id} );

        return resp;
        
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
    }

}

const getComentarioPublication = async (id) => {

    try {
        let resp = await ComentarioPublicacion.findById( id );

        return resp;
        
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
    }

}

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
    getComentarioPublication,
    getComentariosPublicationes
}