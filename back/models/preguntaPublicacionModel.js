const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PreguntaPublicacionSchema = new Schema({
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
  interrogante: {
    type: String,
    required: [true, 'La interrogante es necesaria']
  },
  respuesta: {
    type: String,
    required: false
  },
  creado_en: Date,
  pregunta_id: {
    type: Schema.Types.ObjectId,
    ref: 'Pregunta',
    required: [true, 'El ID de la pregunta es necesario']
  },
  respondido_en: Date
}, { collection: 'preguntaPublicacion' })

module.exports = mongoose.model('PreguntaPublicacion', PreguntaPublicacionSchema)
