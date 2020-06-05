'use strit'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { getCandidato, createCandidato, updateCandidato } = require('../controllers/candidatoController')
const { NotHavePermissions } = require('../errors')
const { getPublication } = require('../controllers/publicacionController')
const { obtenerUsuario } = require('../controllers/usuarioController')
const { responseJSON } = require('../utils/responseJSON')
/**
 * Calificar petición emisor
 */
router.post('/:id/emisor', asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioID } = req.body

  // Verificar permisos
  let candidato = await getCandidato(id)
  const publicacion = await getPublication(candidato.publicacion_id)
  const usuario = await obtenerUsuario(publicacion.anunciante_id)

  if (String(usuarioID) === String(publicacion.anunciante_id)) {
    throw new NotHavePermissions()
  }

  candidato = await updateCandidato(id, {
    es_entregada: req.body.es_entregada,
    calificacion_emisor: req.body.calificacion_emisor
  })
  return responseJSON(true, 'califcacion_emisor_ok', 'La calificacion fue realizada.', candidato)
}))

/**
 * Calificar petición receptor
 */
router.post('/:id/receptor', asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioId } = req.body

  // Verificar permisos
  let candidato = await getCandidato(id)
  const publicacion = await getPublication(candidato.publicacion_id)
  const usuario = await obtenerUsuario(publicacion.anunciante_id)

  if (String(usuarioId) !== String(candidato.usuario_id)) {
    throw new NotHavePermissions()
  }

  candidato = await updateCandidato(id, {
    es_recibida: req.body.es_recibida,
    calificacion_receptor: req.body.calificacion_receptor
  })
  return responseJSON(true, 'califcacion_receptor_ok', 'La calificacion fue realizada.', candidato)
}))

module.exports = router
