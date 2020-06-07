const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Peticion = new Schema({
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
  calificacion_anunciante: {
    type: Number,
    required: false
  },
  calificacion_peticion: {
    type: Number,
    required: false
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  },
  actualizado_en: {
    type: Date,
    ref: 'Actualizo'
  }
}, {
  collection: 'peticion',
  toJSON: {
    virtuals: true,
  }
})

module.exports = mongoose.model('Peticion', Peticion)
