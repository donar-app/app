'use strict';

const fs = require('fs').promises;
const Publicacion = require('../models/publicacion')
const { ResourceNotFound } = require('./../errors');

const getAllPublications = async () => {
    let resp = await Publicacion.find({ estado: 0});
    return resp;
}

const getPublication = async (id) => {

    console.log('el id ', id)
    let resp = await Publicacion.findById( id );

    // try {
	// 	await fs.readFile(resp.imageRoute);
	// } catch (e) {
	// 	if (e.code === 'ENOENT') throw new ResourceNotFound();
	// 	throw e;
	// }

    return resp;

}


const createPublication = async (publicacion) => {
    const { anunciante_id, titulo, categoria, imagenRoute } = publicacion

    let nuevaPublicacion = new Publicacion({
        anunciante_id,
        titulo,
        categoria,
        creada_en: new Date(),
        actualizada_en: new Date(),
        imagenRoute,
        estado: 0,
    })

    let publicacionSaved = await nuevaPublicacion.save();
    return publicacionSaved;

}

const updatePublication = async (id, publicacion) => {
    const { titulo, categoria, imagenRoute } = publicacion

    let publicacionUpdated = await Publicacion.findOneAndUpdate(id, {
        titulo,
        categoria,
        imagenRoute,
        actualizada_en: new Date(),
    }, {new: true})

    return publicacionUpdated;
}

const deletePublication = async (id) => {
    let publicacionDelete = await Publicacion.findOneAndUpdate(id, {estado: 1})
    return publicacionDelete;
}

module.exports = {
    getAllPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication,
}