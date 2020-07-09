const express = require('express')

const router = express.Router()
const { verificaCredenciales } = require('../middlewares/seguridad')
const { crearUsuario, confirmarRegistro, login, recuperarClave } = require('../controllers/usuarioController')

/**
 * Bienvenida a la API
 */
router.get('/', (req, res) => res.json({ tipo: 'correcto', codigo: 'bienvenido', mensaje: 'Bienvenido a la API de donar-app', cuerpo: ['hola'] }))

/**
 * Login de Usuario
 */
router.post('/ingreso', verificaCredenciales, login)

/**
 * Registro de Usuario
 */
router.post('/registro', crearUsuario)

/**
 * Confirmacion de Registro
 */
router.put('/confirmar-registro', confirmarRegistro)

/**
 * Recuperacion de clave por olvido o bloqueo.
 */
router.post('/recuperar-clave', recuperarClave)

module.exports = router
