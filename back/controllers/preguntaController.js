'use strict'

const PreguntaRepository = require('../repository/preguntaRepository')
const PublicacionRepository = require('../repository/publicacionRepository')
const { ResourceNotFound } = require('../errors/not-found')
const { responseJSON } = require('../utils/responseJSON')
const asyncHandler = require('../middlewares/async-handler')

const obtenerPreguntas = asyncHandler(async (req, res) => {
  const { id: publicacionID } = req.params

  if (!publicacionID) {
    return res.json(responseJSON(false, 'pregunta-sin_id', 'Publicacion no encontrada.', []))
  }
  const preguntas = await PreguntaRepository.obtenerPreguntasPorPublicacion(publicacionID)
  return res.json(responseJSON(true, 'preguntas_enviada', 'Preguntas envias.', preguntas))
})

const crearPregunta = asyncHandler(async (req, res, next) => {
  const { jwt_usuario_id: usuarioID, publicacion: publicacionID, pregunta: preguntaValue } = req.body

  const publicacion = await PublicacionRepository.obtenerPorID(publicacionID)

  if (!publicacion) {
    return res.json(responseJSON(false, 'publicacion-error_pregunta', 'Publicacion no existe', []))
  }

  if (String(publicacion.anunciante) === String(usuarioID)) {
    return res.json(responseJSON(false, 'pregunta_error', 'No puede autopreguntarse', []))
  }
  const pregunta = await PreguntaRepository.guardar({
    pregunta: preguntaValue,
    publicacion_id: publicacionID,
    usuario_id: usuarioID,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      }))
  })

  if (!pregunta) {
    return res.json(responseJSON(false, 'pregunta_error_creacion', 'No se puedo generar la pregunta.', []))
  }
  return res.status(201).json(responseJSON(true, 'pregunta_creado', 'Gracias por su pregunta.', pregunta))
})

const getPregunta = async (id) => {
  try {
    const resp = await Pregunta.findById(id)

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const responderPregunta = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioID, respuesta } = req.body

  const pregunta = await PreguntaRepository.responderPregunta(id, usuarioID, respuesta)

  if (!pregunta) {
    return res.json(responseJSON(false, 'pregunta-error_no_encontada', 'No se pudo responder la pregunta.', []))
  }
  return res.json(responseJSON(false, 'pregunta_respondida', 'Se respondia la pregunta correctamente.', pregunta))
})

module.exports = {
  crearPregunta,
  responderPregunta,
  getPregunta,
  obtenerPreguntas
}
