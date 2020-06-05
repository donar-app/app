'use strict'

const Usuario = require('../models/usuarioModel')
const { responseJSON } = require('../utils/responseJSON')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

const crearUsuario = async (usuarioObject) => {
  const newUsuario = new Usuario(usuarioObject)
  return await newUsuario.save()
}

const obtenerUsuario = async (id) => {
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado!', [])
  }
  return responseJSON(true, 'usuario_encontrado', 'Usuario encontrado!', usuario)
}

const obtenerUsuarioPorAlias = async (alias) => {
  return await Usuario.findOne({ alias: alias, es_activo: true })
}

const actualizarUsuario = async (usuarioID, objUsuario) => {
  if (!objUsuario) {
    return responseJSON(false, 'usuario_faltante', 'Falta el objeto usuario', ['obj_usuario'])
  }
  const bufferUsuario = {
    nombre: objUsuario.nombre,
    apellido: objUsuario.apellido,
    alias: objUsuario.alias,
    email: objUsuario.email,
    es_receptor: objUsuario.receptor,
    pais: objUsuario.pais,
    ciudad: objUsuario.ciudad,
    direccion: objUsuario.direccion,
    telefono: objUsuario.telefono,
    es_fundacion: objUsuario.fundacion,
    es_acopio: objUsuario.acopio,
    actualizado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }

  if (objUsuario.clave) {
    bufferUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  }

  const usuario = await Usuario.findOneAndUpdate({ _id: usuarioID }, bufferUsuario, {
    new: true
  })
  usuario.clave = undefined

  return responseJSON(true, 'usuario_editado', 'Usuario fue modificado con exito!', usuario)
}

const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findOneAndUpdate({ _id: id }, { es_activo: false },
    {
      new: true
    })

  if (!usuario) {
    return responseJSON(true, 'usuario_no_eliminado', 'Usuario no encontrado', [])
  }

  return responseJSON(true, 'usuario_eliminado', 'Usuario Eliminado', usuario)
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
