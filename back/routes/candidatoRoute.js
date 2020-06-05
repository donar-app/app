'use strit'

const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { getCandidato, createCandidato, updateCandidato, getCandidatos } = require('../controllers/candidatoController')
const { NotHavePermissions } = require('../errors')
const { getPublication } = require('../controllers/publicacionController')
const { obtenerUsuario } = require('../controllers/usuarioController')

/**
 * Obtener candidatoes de una Publicacion
 */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const data = await getCandidatos(req.params.id)
  res.json({ data })
}))

/**
 * Crear candidato
 */
router.post('/', asyncHandler(async (req, res, next) => {
  // obtener usuario del token
  const { usuario_id: usuarioID, publicacion_id: publicacionID } = req.body
  // Verificar permisos
  const publicacion = await getPublication(publicacionID)

  if (String(publicacion.anunciante_id) !== String(usuarioID)) {
    res.json(await createCandidato({
      usuarioID,
      publicacionID
    }))
  } else {
    throw new NotHavePermissions()
  }
}))

/**
 * Aceptar candidato
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { usuario_id: usuarioID, publicacion_id: publicacionID } = req.body
  // Verificar permisos
  let candidato = await getCandidato(id)
  const publicacion = await getPublication(candidato.publicacion_id)

  let emisorObj = await obtenerUsuario(publicacion.anunciante_id)
  let receptorObj = await obtenerUsuario(candidato.usuario_id)

  emisorObj = {
    nombre: emisorObj.nombre,
    apellido: emisorObj.apellido,
    alias: emisorObj.alias,
    email: emisorObj.email,
    pais: emisorObj.pais,
    ciudad: emisorObj.ciudad
  }

  receptorObj = {
    nombre: receptorObj.nombre,
    apellido: receptorObj.apellido,
    alias: receptorObj.alias,
    email: receptorObj.email,
    pais: receptorObj.pais,
    ciudad: receptorObj.ciudad
  }

  if (String(publicacion.anunciante_id) === String(usuarioID)) {
    candidato = await updateCandidato(id, {
      es_aceptada: req.body.es_aceptada
    })

    res.json({
      candidato,
      emisorObj,
      receptorObj
    })
  } else {
    throw new NotHavePermissions()
  }
}))

module.exports = router
