'use strit'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { getPreguntaPublication, getPreguntasPublicationes, createPreguntaPublication, updatePreguntaPublication } = require('../controllers/preguntaPublicacionController')
const { getPublication } = require('../controllers/publicacionController')
const { NotHavePermissions } = require('../errors')
const { verificaToken } = require('../middlewares/seguridad')
const { responseJSON } = require('../utils/responseJSON')

/**
 * Se creara un documento "Pregunta" dentro de la publicacion espeficida.
 * @param {Number} publicacion_id Es el id de la publicacion
 * @param {String} pregunta Es la pregunta de la publicacion
 */
router.post('/', verificaToken, asyncHandler(async (req, res, next) => {
  const { jwt_usuario_id: usuarioID, publicacion_id: publicacionID, interrogante } = req.body

  const publicacion = await getPublication(publicacionID)
  if (String(publicacion.anunciante_id) !== String(usuarioID)) {
    throw new NotHavePermissions()
  }
  const pregunta = await createPreguntaPublication({
    interrogante: interrogante,
    publicacion_id: publicacionID,
    usuario_id: usuarioID
  })
  return responseJSON(true, 'pregunta_creado', 'Gracias por su pregunta.', pregunta)
}))

/**
 * Modificar pregunta
 */
router.put('/:id', verificaToken, asyncHandler(async (req, res, next) => {
  const { id } = req.params
  // verificar si el usuario es el dueño de la publicación
  const { jwt_usuario_id: usuarioID } = req.body

  const pregunta = await getPreguntaPublication(id)
  const publicacion = await getPublication(pregunta.publicacion_id)

  if (String(publicacion.anunciante_id) === String(usuarioID)) {
    res.json(await updatePreguntaPublication(id, {
      respuesta: req.body.respuesta
    }))
  } else {
    throw new NotHavePermissions()
  }
}))

/**
 * Get preguntas
 */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id: publicacionID } = req.params
  const preguntas = await getPreguntasPublicationes(publicacionID)
  return responseJSON(true, 'pregunta_creada', 'Gracias por su pregunta.', preguntas)
}))

module.exports = router
