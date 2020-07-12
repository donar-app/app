const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contacto = new Schema({
  nombre: {
    type: String,
    ref: 'Nombre',
    minlength: 3,
    maxlength: 50,
    required: [true, 'El nombre es necesario']
  },
  correo: {
    type: String,
    ref: 'Correo',
    minlength: 5,
    maxlength: 50,
    required: [true, 'El correo es necesario']
  },
  titulo: {
    type: String,
    ref: 'Titulo',
    minlength: 5,
    maxlength: 50,
    required: [true, 'El titulo es necesario']
  },
  mensaje: {
    type: String,
    ref: 'Mensaje',
    minlength: 5,
    maxlength: 500,
    required: [true, 'El mensaje es necesario']
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  }
}, {
  collection: 'contacto',
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Contacto', Contacto)
