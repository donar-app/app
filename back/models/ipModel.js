const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ip = new Schema({
  pais: {
    type: String,
    ref: 'Pais',
    minlength: 2,
    maxlength: 5,
    required: [true, 'El Pais es necesario']
  },
  region: {
    type: String,
    ref: 'Region',
    minlength: 3,
    maxlength: 25,
    required: [true, 'El Region es necesario']
  },
  ciudad: {
    type: String,
    ref: 'Ciudad',
    minlength: 3,
    maxlength: 25,
    required: [true, 'El ciudad es necesario']
  },
  valor: {
    type: String,
    ref: 'valor',
    minlength: 5,
    maxlength: 25,
    required: [true, 'El valor es necesario']
  },
  creado_en: {
    type: Date,
    ref: 'Creado',
    required: [true, 'El Creado es necesario']
  }
}, {
  collection: 'ip',
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Ip', Ip)
