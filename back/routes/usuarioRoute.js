const express = require('express')

const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { actualizarUsuario, eliminarUsuario, obtenerUsuario } = require('../controllers/usuarioController')
const { responseJSON } = require('../utils/responseJSON')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)

/**
 * Editar un usuario ya existente
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.put('/', asyncHandler(async (req, res) => {
  const bufferUsuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    alias: req.body.alias,
    email: req.body.email,
    es_receptor: req.body.receptor,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    es_fundacion: req.body.fundacion,
    es_acopio: req.body.acopio,
    actualizado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }

  if (req.body.clave) {
    bufferUsuario.clave = await bcrypt.hashSync(req.body.clave, SALT)
  }

  const usuario = await actualizarUsuario(req.body.jwt_usuario_id, bufferUsuario)
  usuario.clave = undefined

  return res.status(201).json(responseJSON(true, 'usuario_editado', 'Usuario fue modificado con exito!', usuario))
}))

/**
 * Obtener un usuario. Obtenemos el alias del token y asi recuperarlo de la db.
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.get('/', asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body
  const usuario = await obtenerUsuario(usuarioID)
  return res.json(responseJSON(true, 'usuario_obtenido', 'Usuario encontrado', usuario))
}))

/**
 * Cambiar el estado "false" de un usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.delete('/', asyncHandler(async (req, res) => {
  const usuario = await eliminarUsuario(req.body.jwt_usuario_id)
  return res.json(responseJSON(true, 'usuario_eliminado', 'Usuario Eliminado', usuario))
}))

module.exports = router
