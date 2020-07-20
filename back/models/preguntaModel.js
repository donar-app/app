const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PreguntaSchema = new Schema({
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
  pregunta: {
    type: String,
    required: [true, 'La pregunta es necesaria']
  },
  respuesta: {
    type: String,
    required: false
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  },
  respondida_en: {
    type: Date,
    ref: 'Respondida',
    required: false
  }
}, {
  collection: 'pregunta',
  toJSON: {
    virtuals: true
  }
})

PreguntaSchema.virtual('publicacion', {
  ref: 'Publicacion',
  localField: 'publicacion_id',
  foreignField: 'id',
  justOne: false
})

module.exports = mongoose.model('Pregunta', PreguntaSchema)
