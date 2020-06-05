'use strict'

const Usuario = require('../models/usuarioModel')

const crearUsuario = async (usuarioObject) => {
  const newUsuario = new Usuario(usuarioObject)
  return await newUsuario.save()
}

const obtenerUsuario = async (id) => {
  return await Usuario.findById(id)
}

const obtenerUsuarioPorAlias = async (alias) => {
  return await Usuario.findOne({ alias: alias, es_activo: true })
}

const actualizarUsuario = async (id, usuarioObject) => {
  return await Usuario.findOneAndUpdate({ _id: id }, usuarioObject, {
    new: true
  })
}

const eliminarUsuario = async (id) => {
  return await Usuario.findOneAndUpdate({ _id: id }, { es_activo: false },
    {
      new: true
    })
}

const loginGoogle = async (objUsuario) => {
  return await Usuario.create(objUsuario)
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarioPorAlias,
  actualizarUsuario,
  eliminarUsuario,
  loginGoogle
}
