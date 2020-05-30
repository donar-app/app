const mongoose = require('mongoose')
let Schema = mongoose.Schema

let usuario = new Schema({
    nombre: {
        type: String,
        ref: 'Nombre',
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        ref: 'Apellido',
        required: [true, 'El apellido es necesario']
    },
    alias: {
        type: String,
        ref: 'Alias',
        required: [true, 'El alias es necesario']
    },
    email: {
        type: String,
        ref: 'Alias',
        required: [true, 'El email es necesario']
    },
    pais: {
        type: String,
        ref: 'Pais',
        required: [true, 'El pais es necesario']
    },
    ciudad: {
        type: String,
        ref: 'Ciudad',
        required: [true, 'El ciudad es necesario']
    },
    direccion: {
        type: String,
        ref: 'Direccion',
        required: [false, 'El direccion es necesario']
    },
    telefono: {
        type: String,
        ref: 'Telefono',
        required: [true, 'El telefono es necesario']
    },
    es_fundacion: {
        type: String,
        ref: 'Fundacion',
        required: [true, 'El Campo Fundacion es necesario']
    },
    es_acopio: {
        type: String,
        ref: 'Acopio',
        required: [true, 'El Campo Acopio es necesario']
    },
    es_activo: {
        type: String,
        ref: 'Activo',
        required: [true, 'El Campo Activo es necesario']
    },
    creada_en: {
        type: String,
        ref: 'Creado',
        required: [true, 'El Creado es necesario']
    },
    actualizada_en: {
        type: String,
        ref: 'Actualizo',
        required: [false, 'El alias es necesario']
    },
})

module.exports = mongoose.model('Usuario', usuario)