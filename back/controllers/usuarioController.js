'use strict'

const UsuarioRepository = require('../repository/usuarioRepository')
const { responseJSON } = require('../utils/responseJSON')
const { seguridadDeClave } = require('../utils/myUtils')
const asyncHandler = require('../middlewares/async-handler')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

const obtenerUsuario = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id } = req.body
  const { objeto: usuario } = await UsuarioRepository.leerPorID(id)
  if (!usuario) {
    return res.json(responseJSON(false, 'usuario-no_encontrado', 'Usuario no encontrado!', []))
  }
  return res.json(responseJSON(true, 'usuario-encontrado', 'Usuario encontrado!', usuario))
})

const actualizarUsuario = asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario, jwt_usuario_id: usuarioID } = req.body
  if (!objUsuario) {
    return res.json(responseJSON(false, 'usuario_faltante', 'Falta el objeto usuario', ['obj_usuario']))
  }

  if (objUsuario.clave) {
    const resultadoSeguridad = seguridadDeClave(objUsuario.clave)

    if (!resultadoSeguridad) {
      return res.json(responseJSON(false, 'usuario-clave_insegura', 'Su clave es insegura', []))
    }
    objUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  }

  objUsuario.actualizado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const { error, objeto: usuario } = await UsuarioRepository.actualizarPorID(usuarioID, objUsuario)

  if (error) {
    return res.json(responseJSON(false, 'usuario-error_propiedad', error, []))
  }
  usuario.clave = undefined

  return res.json(responseJSON(true, 'usuario-editado', 'Usuario fue modificado con exito!', usuario))
})

const eliminarUsuario = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id } = req.body
  const { error, objeto: usuario } = await UsuarioRepository.eliminarPorID(id)

  if (error) {
    return res.json(responseJSON(false, 'usuario-error_al_eliminar', 'Usuario no encontrado', []))
  }

  return res.json(responseJSON(true, 'usuario-eliminado', 'Usuario Eliminado', usuario))
})

module.exports = {
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
}
