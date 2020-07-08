'use strit'

const express = require('express')
const router = express.Router()
const { crearPregunta, obtenerPreguntas, responderPregunta } = require('../controllers/preguntaController')
const { verificaToken } = require('../middlewares/seguridad')

/**
 * Se creara un documento "Pregunta" dentro de la publicacion espeficida.
 * @param {Number} publicacion Es el id de la publicacion
 * @param {String} pregunta Es la pregunta de la publicacion
 */
router.post('/', verificaToken, crearPregunta)

/**
 * Responder una pregunta
 */
router.put('/responder-pregunta', verificaToken, responderPregunta)

/**
 * Get preguntas
 */
router.get('/:id', obtenerPreguntas)

module.exports = router
