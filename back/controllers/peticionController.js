'use strict';

let Peticion = require('../models/peticionModel')


const getPeticiones = async (id) => {
    let resp = await Peticion.find({ publicacion_id: id });
    return resp;
}


const getPeticion = async (id) => {

    try {
        let resp = await Peticion.findById( id );

        return resp;
        
	} catch (e) {
		if (e.code === 'ENOENT') throw new ResourceNotFound();
		throw e;
    }

}

const createPeticion = async (peticionObject) => {
    let peticion = new Peticion( peticionObject );

    return await peticion.save();
}

const updatePeticion = async (id, peticion) => {
    return await Peticion.findOneAndUpdate(
        {_id: id}, 
        peticion, 
        { 
            new: true, 
            runValidators: true, 
            context: 'query'
        }
    );
}

module.exports = {
    createPeticion,
    updatePeticion,
    getPeticion,
    getPeticiones
}