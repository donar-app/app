const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentarioPublicacionSchema = new Schema({
  pregunta: {
    type: String,
    required: [true, 'La pregunta es necesaria']
  },
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
  respuesta: {
    type: String,
    required: false
  }
}, { collection: 'comentariospublicaciones' })

module.exports = mongoose.model('ComentarioPublicacion', comentarioPublicacionSchema)
