const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
  nombre: {
    type: String,
    ref: 'Nombre',
    minlength: 3,
    maxlength: 50,
    required: [true, 'El nombre es necesario']
  },
  apellido: {
    type: String,
    ref: 'Apellido',
    minlength: 3,
    maxlength: 50,
    required: [true, 'El apellido es necesario']
  },
  alias: {
    type: String,
    ref: 'Alias',
    minlength: 3,
    maxlength: 50,
    unique: true,
    index: true,
    required: [true, 'El alias es necesario']
  },
  correo: {
    type: String,
    ref: 'Correo',
    minlength: 5,
    maxlength: 50,
    unique: true,
    index: true,
    required: [true, 'El correo es necesario']
  },
  clave: {
    type: String,
    ref: 'Clave',
    required: [true, 'El clave es necesario']
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
    required: [true, 'El ciudad es necesario']
  },
  direccion: {
    type: String,
    ref: 'Direccion',
    minlength: 5,
    maxlength: 50,
    required: [false, 'El direccion es necesario']
  },
  telefono: {
    type: String,
    ref: 'Telefono',
    minlength: 8,
    maxlength: 20,
    required: [false, 'El telefono es necesario']
  },
  es_institucion: {
    type: Boolean,
    ref: 'Institucion',
    required: [false, 'El Campo Institucion es necesario']
  },
  es_acopio: {
    type: Boolean,
    ref: 'Acopio',
    required: [false, 'El Campo Acopio es necesario']
  },
  es_activo: {
    type: Boolean,
    ref: 'Activo',
    required: [true, 'El Campo Activo es necesario']
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  },
  actualizado_en: {
    type: Date,
    ref: 'Actualizo',
    required: [false, 'El alias es necesario']
  }
}, {
  collection: 'usuario',
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Usuario', Usuario)
