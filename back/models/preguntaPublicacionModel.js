const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PreguntaPublicacionSchema = new Schema({
  publicacion: {
    type: Schema.Types.ObjectId,
    ref: 'Publicacion',
    required: [true, 'El ID de publicación es necesario']
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El ID de usuario es necesario']
  },
  pregunta: {
    type: String,
    required: [true, 'La pregunta es necesaria']
  },
  respuesta: {
    type: String,
    required: false
  },
  creado_en: Date,
  respondido_en: Date,
}, { collection: 'preguntaPublicacion' })

module.exports = mongoose.model('PreguntaPublicacion', PreguntaPublicacionSchema)
