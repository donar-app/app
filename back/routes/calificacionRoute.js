'use strit'

const express = require('express')
const router = express.Router()
const { calificacionEmisor, calificacionReceptor } = require('../controllers/peticionController')
/**
 * Calificar petición emisor
 */
router.post('/:id/emisor', calificacionEmisor)

/**
 * Calificar petición receptor
 */
router.post('/:id/receptor', calificacionReceptor)

module.exports = router
