const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pregunta = require('./preguntaModel')

const publicacionSchema = new Schema({

  anunciante_id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
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
  pais: {
    type: String,
    ref: 'Pais',
    minlength: 1,
    maxlength: 5,
    required: [true, 'El pais es necesario']
  },
  ciudad: {
    type: String,
    ref: 'Ciudad',
    minlength: 3,
    maxlength: 50,
    required: [false, 'El ciudad es necesario']
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
  collection: 'publicacion',
  toJSON: {
    virtuals: true
  }
})

publicacionSchema.virtual('preguntas', {
  ref: 'Pregunta',
  localField: '_id',
  foreignField: 'publicacion',
  justOne: false
})

publicacionSchema.virtual('peticiones', {
  ref: 'Peticion',
  localField: '_id',
  foreignField: 'publicacion',
  justOne: false
})

module.exports = mongoose.model('Publicacion', publicacionSchema)
