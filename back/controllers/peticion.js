'use strict';

let Peticion = require('../models/peticion')

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
}