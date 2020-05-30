const mongoose = require('mongoose')
let Schema = mongoose.Schema

let peticion = new Schema({
    publicacion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, 'El ID de publicación es necesario']
    },
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID de usuario es necesario']
    },
    es_aceptada: {
        type: Boolean,
        required: false,
        default: false
    },
    es_recibida: {
        type: Boolean,
        required: false,
        default: false
    },
    es_entregada: {
        type: Boolean,
        required: false,
        default: false
    },
    calificacion_emisor: {
        type: Number,
        required: false
    },
    calificacion_receptor: {
        type: Number,
        required: false
    }
}, { collection: 'peticiones' })

module.exports = mongoose.model('Peticion', peticion)