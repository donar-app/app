'use strict';

const fs = require('fs');
const path = require('path');
const Publicacion = require('../models/publicacion')
const isImage = require('../utils/is-image');
const { ResourceNotFound } = require('./../errors');




const getAllPublications = async () => {
    let resp = await Publicacion.find({ estado: 0});
    return resp;
}

const getPublication = async (id) => {

    try {
        let resp = await Publicacion.findById( id );
        let chunks = '';
        let imagen64 = await fs.createReadStream( path.resolve( __dirname, `../uploads/${ resp.imagenRoute }`) );

        imagen64.setEncoding('base64');

        for await (const chunk of imagen64) {
            chunks += chunk;
        }

        resp.imagenRoute = chunks;

        return resp;
        
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
    }

}


const createPublication = async ( publicacion ) => {
    const { anunciante_id, titulo, categoria, descripcion, imagenRoute } = publicacion;
    let imagen =  Buffer.from(imagenRoute, 'base64');
    let nameFile = `${anunciante_id}-${new Date().getTime()}`;


    if ( !isImage( imagen ) ) {
        console.log('ERRORRR');
        return {message: 'no es una imagen'}
    }

    fs.writeFileSync(path.resolve( __dirname, `../uploads/${nameFile}`), imagenRoute, 'base64')


    let nuevaPublicacion = new Publicacion({
        anunciante_id,
        titulo,
        categoria,
        descripcion,
        creada_en: new Date(),
        actualizada_en: new Date(),
        imagenRoute: nameFile,
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