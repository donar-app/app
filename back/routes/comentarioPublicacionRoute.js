'use strit'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { getComentarioPublication, getComentariosPublicationes, createComentarioPublication, updateComentarioPublication } = require('../controllers/comentarioPublicacion')
const { getPublication } = require('../controllers/publicacion')
const { NotHavePermissions } = require('../errors')
const { verificaToken } = require('../middlewares/seguridad')
const { responseJSON } = require('../utils/responseJSON')

/**
 * Se creara un documento "Comentario" dentro de la publicacion espeficida.
 * @param {Number} publicacion_id Es el id de la publicacion
 * @param {String} pregunta Es la pregunta de la publicacion
 */
router.post('/', verificaToken, asyncHandler(async (req, res, next) => {
  const { jwt_usuario_id: usuarioID, publicacion_id: publicacionID, pregunta } = req.body

  const publicacion = await getPublication(publicacionID)
  if (String(publicacion.anunciante_id) !== String(usuarioID)) {
    throw new NotHavePermissions()
  }
  const comentario = await createComentarioPublication({
    pregunta: pregunta,
    publicacion_id: publicacionID,
    usuario_id: usuarioID
  })
  return responseJSON(true, 'comentario_creado', 'Gracias por su comentario.', comentario)
}))

/**
 * Modificar comentario
 */
router.put('/:id', verificaToken, asyncHandler(async (req, res, next) => {
  const { id } = req.params
  // verificar si el usuario es el dueño de la publicación
  const { jwt_usuario_id: usuarioID } = req.body

  const comentario = await getComentarioPublication(id)
  const publicacion = await getPublication(comentario.publicacion_id)

  if (String(publicacion.anunciante_id) === String(usuarioID)) {
    res.json(await updateComentarioPublication(id, {
      respuesta: req.body.respuesta
    }))
  } else {
    throw new NotHavePermissions()
  }
}))

/**
 * Get comentarios
 */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id: publicacionID } = req.params
  const comentarios = await getComentariosPublicationes(publicacionID)
  return responseJSON(true, 'comentario_creado', 'Gracias por su comentario.', comentarios)
}))

module.exports = router
