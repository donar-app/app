'use strict'

const express = require('express')
const router = express.Router()
const { verificaToken } = require('../middlewares/seguridad')
const { obtenerPublicacion, obtenerPublicaciones, crearPublicacion, editarPublicacion, eliminarPublicacion } = require('../controllers/publicacionController')

/**
 * Obtienes todas las publicaciones activas
 */
router.get('/', obtenerPublicaciones)

/**
 * Obtiene una publicacion por su ID
 */
router.get('/:id', obtenerPublicacion)

/**
 * Crea una nueva publicacion
 */
router.post('/', verificaToken, crearPublicacion)

/**
 * Edita una publicacion por su ID
 */
router.put('/:id', verificaToken, editarPublicacion)

/**
 * Elimina una publicacion por su ID
 */
router.delete('/:id', verificaToken, eliminarPublicacion)

module.exports = router
