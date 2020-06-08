const express = require('express')

const router = express.Router()
const { verificaCredenciales } = require('../middlewares/seguridad')
const { crearUsuario, loginConAlias } = require('../controllers/usuarioController')

/**
 * Bienvenida a la API
 */
router.get('/', (req, res) => res.json(true, 'bienvenido', 'Bienvenido a la api de donar-app.', ['hola']))

/**
 * Login de Usuario
 */
router.post('/ingreso', verificaCredenciales, loginConAlias)

/**
 * Registro de Usuario
 */
router.post('/registro', crearUsuario)

module.exports = router
