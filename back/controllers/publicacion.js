'use strict';

const fs = require('fs');
const path = require('path');
const Publicacion = require('../models/publicacion')
const isImage = require('../utils/is-image');
const createImage = require('../utils/create-image');

const { ResourceNotFound, ResourceNotImage } = require('./../errors');


const getAllPublications = async () => {
    let resp = await Publicacion.find({ estado: 0});

    for await (const publi of resp) {

        publi.imagenRoute = await createImage(publi.imagenRoute);
    }

    return resp;
}


const getPublication = async (id) => {

    try {
        let resp = await Publicacion.findById( id );

        resp.imagenRoute = await createImage(resp.imagenRoute);

        return resp;
        
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
    }

}


const createPublication = async ( publicacion ) => {
    const { anunciante_id, titulo, categoria, descripcion, tipo, imagenRoute } = publicacion;
    let imagen =  Buffer.from(imagenRoute, 'base64');
    let nameFile = `${anunciante_id}-${new Date().getTime()}`;

    if ( !isImage( imagen ) ) throw new ResourceNotImage();

    fs.writeFileSync(path.resolve( __dirname, `../uploads/${nameFile}`), imagenRoute, 'base64')

    let nuevaPublicacion = new Publicacion({
        anunciante_id,
        titulo,
        categoria,
        descripcion,
        tipo,
        creada_en: new Date(),
        actualizada_en: new Date(),
        imagenRoute: nameFile,
        estado: 0,
    })

    let publicacionSaved = await nuevaPublicacion.save();
    return publicacionSaved;

}


const updatePublication = async (id, publicacion) => {
    
    const { anunciante_id, titulo, categoria, descripcion, tipo, imagenRoute } = publicacion
    let imagen =  Buffer.from(imagenRoute, 'base64');

    if ( !isImage( imagen ) ) throw new ResourceNotImage();

    let publi = await Publicacion.findById(id);

    fs.writeFileSync(path.resolve( __dirname, `../uploads/${publi.imagenRoute}`), imagenRoute, 'base64')

    let publicacionUpdated = await Publicacion.findOneAndUpdate(id, {
        titulo,
        categoria,
        descripcion,
        tipo,
        imagenRoute: publi.imagenRoute,
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