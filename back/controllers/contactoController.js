'use strict';

const Contacto = require('../models/contactoModel')

const crearContacto = async (contactoObject) => {
    let newContacto = new Contacto(contactoObject );
    return await newContacto.save();
}

module.exports = {
    crearContacto
}