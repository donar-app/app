'use strict'

const express = require('express')

const router = express.Router()
const { obtenerUnaPeticion, peticionesPorPublicacion, misPeticiones, crearPeticion, modificaPeticion, calificacionEmisor, calificacionReceptor } = require('../controllers/peticionController')

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
 * Obtener mis peticiones
 */
router.get('/', misPeticiones)

/**
 * Calificar petición emisor
 */
router.post('/calificacion-emisor', calificacionEmisor)

/**
 * Calificar petición receptor
 */
router.post('/calificacion-receptor', calificacionReceptor)

/**
 * Aceptar peticion
 */
router.put('/:id', modificaPeticion)

module.exports = router
