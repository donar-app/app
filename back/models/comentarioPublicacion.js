const mongoose = require('mongoose')
let Schema = mongoose.Schema

let comentarioPublicacionSchema = new Schema({
    pregunta: {
        type: String,
        required: [true, 'La pregunta es necesaria']
    },
    donacion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Donacion',
        required: [true, 'El ID de donación es necesario']
    },
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID de usuario es necesario']
    },
    respuesta: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('ComentarioPublicacion', comentarioPublicacionSchema)