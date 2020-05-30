'use strict';

const fs = require('fs').promises;
const Publicacion = require('../models/publicacion')
const { ResourceNotFound } = require('./../errors');

const getAllPublications = async () => {
    let resp = await Publicacion.find();
    return resp;
}

const getPublication = async (id) => {

    let resp = await Publicacion.find();

    try {
		await fs.readFile(resp.imageRoute);
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
	}

    return resp;

}


const createPublication = async (publicacion) => {
    let nuevaPublicacion = new Publicacion({
        anunciante_id = 'ObjectId("MaxiId")',
        titulo = 'Computadora de escritorio',
        categoria = 'informatica',
        creada_en = new Date(),
        actualizada_en = new Date(),
        imageRoute = './images/lalala.png',
        comentario = 'esto es un comentario',
        solicitud = 'alguna solicitud'
    })

    let publicacionSaved = await nuevaPublicacion.save();
    return publicacionSaved;

}

const updatePublication = async (id, publicacion) => {

}

const deletePublication = async (id) => {

}

module.exports = {
    getAllPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication,
}