const express = require('express')

const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { actualizarUsuario, eliminarUsuario, obtenerUsuario } = require('../controllers/usuarioController')

/**
 * Editar un usuario ya existente
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.put('/', asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario, jwt_usuario_id: usuarioID } = req.body
  const resultadoActualizacion = await actualizarUsuario(usuarioID, objUsuario)
  return res.json(resultadoActualizacion)
}))

/**
 * Obtener un usuario. Obtenemos el alias del token y asi recuperarlo de la db.
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.get('/', asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body
  const resultado = await obtenerUsuario(usuarioID)
  return res.json(resultado)
}))

/**
 * Cambiar el estado "false" de un usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.delete('/', asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body
  const resultado = await eliminarUsuario(usuarioID)
  return res.json(resultado)
}))

module.exports = router
