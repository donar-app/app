'use strit'

const express = require('express')
const router = express.Router()
const { obtenerUnaPeticion, peticionesPorPublicacion, crearPeticion, modificaPeticion } = require('../controllers/peticionController')

/**
 * Crear peticion
 */
router.post('/', crearPeticion)

/**
 * Obtener peticion
 */
router.get('/:id', obtenerUnaPeticion)

/**
 * Obtener peticiones de una Publicacion
 */
router.get('/por-publicacion/:publicacion_id', peticionesPorPublicacion)

/**
 * Aceptar peticion
 */
router.put('/:id', modificaPeticion)

module.exports = router
