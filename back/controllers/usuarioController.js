'use strict'

const Usuario = require('../models/usuarioModel')
const { generaStringRandom } = require('../utils/myUtils')
const UsuarioRepository = require('../repository/usuarioRepository')
const { responseJSON } = require('../utils/responseJSON')
const asyncHandler = require('../middlewares/async-handler')
const { crearToken, setTokenEnCabecera } = require('../middlewares/seguridad')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)
const passport = require('passport')
require('../middlewares/oauth')

const crearUsuario = asyncHandler(async (req, res, next) => {
  const { obj_usuario: objUsuario } = req.body

  if (!objUsuario) {
    return res.json(responseJSON(true, 'registro_error', 'Falta el objeto usuario', ['obj_usuario']))
  }

  if (!Object.prototype.hasOwnProperty.call(objUsuario, 'alias')) {
    return res.json(responseJSON(false, 'falta_alias', 'Falta el parametro alias', []))
  }

  const clave = process.env.NODE_ENV === 'PROD' ? generaStringRandom(8) : objUsuario.alias
  objUsuario.clave = await bcrypt.hashSync(clave, SALT)
  objUsuario.es_activo = true
  objUsuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  try {
    const usuario = new Usuario(objUsuario)
    const resultUsuario = await usuario.save()
    resultUsuario.clave = undefined
    return res.json(responseJSON(true, 'usuario_registrado', 'Usuario registrado con exito!', resultUsuario))
  } catch (error) {
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'alias')) {
      return res.json(responseJSON(false, 'valor_duplicado', 'El alias ya esta registro por otro usuario.', error.keyValue))
    }
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'correo')) {
      // Aca le enviaremos un mail al usuario.
    }
    return res.json(responseJSON(false, 'error_interno', 'No pudimos registrarlo.', []))
  }
})

const obtenerUsuario = async (id) => {
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado!', [])
  }
  return responseJSON(true, 'usuario_encontrado', 'Usuario encontrado!', usuario)
}

const loginConAlias = asyncHandler(async (req, res, next) => {
  const { credencial_alias: alias, credencial_clave: clave } = req.body

  const usuario = await UsuarioRepository.obtenerPorAlias(alias)

  if (!usuario || !usuario.clave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave)

  if (!validaClave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }

  usuario.clave = undefined
  const token = await crearToken({ id: usuario.id, alias: usuario.alias })
  await setTokenEnCabecera(res, token)

  return res.json(responseJSON(true, 'usuario_logeado', 'Usuario logeado con exito!', usuario))
})

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
  loginConAlias,
  actualizarUsuario,
  eliminarUsuario,
  loginGoogle
}
