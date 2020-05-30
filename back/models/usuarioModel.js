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
    }
})

module.exports = mongoose.model('Usuario', usuario)