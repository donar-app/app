'use strict'

const PreguntaRepository = require('../repository/preguntaRepository')
const PublicacionRepository = require('../repository/publicacionRepository')
const { responseJSON } = require('../utils/responseJSON')
const asyncHandler = require('../middlewares/async-handler')

const crearPregunta = asyncHandler(async (req, res) => {
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

const obtenerPregunta = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.json(responseJSON(false, 'pregunta-sin_id', 'Pregunta no encontrada.', []))
  }
  const pregunta = await PreguntaRepository.obtenerPorID(id)
  return res.json(responseJSON(true, 'pregunta-enviada', 'Pregunta enviada.', pregunta))
})

const obtenerMisPreguntas = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body

  const preguntas = await PreguntaRepository.obtenerPreguntasPorUsuario(usuarioID)
  return res.json(responseJSON(true, 'preguntas_enviada', 'Preguntas enviadas.', preguntas))
})

const obtenerMisRespuestas = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body

  const preguntas = await PreguntaRepository.obtenerRespuestasPorUsuario(usuarioID)
  return res.json(responseJSON(true, 'preguntas_enviada', 'Preguntas enviadas.', preguntas))
})

const obtenerPreguntas = asyncHandler(async (req, res) => {
  const { id: publicacionID } = req.params

  if (!publicacionID) {
    return res.json(responseJSON(false, 'pregunta-sin_id', 'Publicacion no encontrada.', []))
  }
  const preguntas = await PreguntaRepository.obtenerPreguntasPorPublicacion(publicacionID)
  return res.json(responseJSON(true, 'preguntas_enviada', 'Preguntas enviadas.', preguntas))
})

const responderPregunta = asyncHandler(async (req, res) => {
  const { id: preguntaID, publicacion_id: publicacionID, jwt_usuario_id: usuarioID, respuesta } = req.body

  if (!preguntaID || !respuesta) {
    return res.json(responseJSON(false, 'pregunta-faltan_parametros', 'Faltan algunos parametros', ['id', 'respuesta']))
  }
  const publicacion = await PublicacionRepository.obtenerPorID(publicacionID, usuarioID)

  if (!publicacion) {
    return res.json(responseJSON(false, 'publicacion-error_no_encontada', 'Publicacion no encontrada', []))
  }

  const pregunta = await PreguntaRepository.buscarParaResponder(preguntaID, usuarioID, respuesta)

  if (!pregunta) {
    return res.json(responseJSON(false, 'pregunta-error_no_encontada', 'No se pudo responder la pregunta.', []))
  }

  return res.json(responseJSON(true, 'pregunta_respondida', 'Se respondió la pregunta correctamente.', pregunta))
})

module.exports = {
  crearPregunta,
  responderPregunta,
  obtenerPregunta,
  obtenerPreguntas,
  obtenerMisPreguntas,
  obtenerMisRespuestas
}
