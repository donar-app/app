const express = require('express')

const router = express.Router()
const { actualizarUsuario, eliminarUsuario, obtenerUsuario } = require('../controllers/usuarioController')

/**
 * Editar un usuario por su ID
 */
router.put('/', actualizarUsuario)

/**
 * Obtener un usuario.
 */
router.get('/', obtenerUsuario)

/**
 * Elimina un usuario
 */
router.delete('/', eliminarUsuario)

module.exports = router
