'use strict'

const Usuario = require('../models/usuarioModel')
const { responseJSON } = require('../utils/responseJSON')
const { generaStringRandom } = require('../utils/myUtils')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

const crearUsuario = async (objUsuario) => {
  if (!objUsuario.alias) {
    return responseJSON(true, 'falta_alias', 'Falta el parametro alias', [])
  }

  const clave = process.env.NODE_ENV === 'PROD' ? generaStringRandom(8) : objUsuario.alias
  objUsuario.clave = await bcrypt.hashSync(clave, SALT)
  objUsuario.es_activo = true
  objUsuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const usuario = new Usuario(objUsuario)
  return await usuario.save()
}

const obtenerUsuario = async (id) => {
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado!', [])
  }
  return responseJSON(true, 'usuario_encontrado', 'Usuario encontrado!', usuario)
}

const loginMedianteAlias = async (alias, clave) => {
  const usuario = await Usuario.findOne({ alias: alias, es_activo: true })

  if (!usuario || !usuario.clave) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', [])
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave)

  if (!validaClave) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', [])
  }

  usuario.clave = undefined

  return responseJSON(true, 'usuario_logeado', 'Usuario logeado con exito!', usuario)
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
  loginMedianteAlias,
  actualizarUsuario,
  eliminarUsuario,
  loginGoogle
}
