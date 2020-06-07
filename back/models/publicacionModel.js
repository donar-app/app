const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PreguntaPublicacion = require('./preguntaPublicacionModel')

const publicacionSchema = new Schema({

  anunciante: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  tipo: {
    type: String,
    ref: 'Tipo',
    required: [true, 'El Tipo es necesario']
  },
  titulo: {
    type: String,
    minlength: 3,
    maxlength: 50,
    ref: 'Titulo',
    required: [true, 'El Titulo es necesario']
  },
  descripcion: {
    type: String,
    minlength: 10,
    maxlength: 500,
    ref: 'Descripcion',
    required: [true, 'El Descripcion es necesario']
  },
  categoria: {
    type: String,
    minlength: 3,
    maxlength: 50,
    ref: 'Categoria',
    required: [true, 'El Categoria es necesario']
  },
  estado: {
    type: String,
    default: 'Publicado'
  },
  imagen: {
    type: String
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  },
  actualizado_en: {
    type: Date,
    ref: 'Actualizo'
  },
  preguntas: [
    { type: mongoose.Schema.ObjectId, ref: 'PreguntaPublicacion' }
  ]
}, { collection: 'publicacion' })

module.exports = mongoose.model('Publicacion', publicacionSchema)
