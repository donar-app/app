'use strict'

const PeticionRepository = require('../repository/peticionRepository')
const PublicacionRepository = require('../repository/publicacionRepository')
const UsuarioRepository = require('../repository/usuarioRepository')
const asyncHandler = require('../middlewares/async-handler')
const { responseJSON } = require('../utils/responseJSON')

const crearPeticion = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID, obj_peticion: objPeticion, publicacion_id: publicacionID } = req.body

  if (!objPeticion || !publicacionID) {
    return res.json(responseJSON(false, 'peticion_invalida', 'Error en ID', ['obj_peticion', 'publicacion_id']))
  }

  const publicacion = await PublicacionRepository.leerParaPeticion(publicacionID, usuarioID)

  if (!publicacion) {
    return res.json(responseJSON(false, 'peticion-publicacion_nula', 'Publicacion no encontrada', []))
  }

  objPeticion.publicacion_id = publicacion.id
  objPeticion.usuario_id = usuarioID
  objPeticion.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))
  const { objeto: peticion } = await PeticionRepository.crear(objPeticion, usuarioID, publicacionID)
  if (!peticion) {
    return res.json(responseJSON(false, 'peticion-error', 'No se puede guardar la peticion', []))
  }
  return res.status(201).json(responseJSON(true, 'peticion-ok', 'Peticion creada', peticion))
})

const obtenerUnaPeticion = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id || id.length < 1) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }
  const peticion = await PeticionRepository.leerPorID(id)
  return res.json(responseJSON(true, 'peticion_retornada', 'Peticion Obtenida', peticion))
})

const misPeticiones = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: usuarioID } = req.body

  const peticiones = await PeticionRepository.leerMisPeticiones(usuarioID)
  return res.json(responseJSON(true, 'peticiones_retornas', 'Peticiones Obtenidas', peticiones))
})

const peticionesPorPublicacion = asyncHandler(async (req, res) => {
  const { publicacion_id: publicacionID } = req.params
  if (!publicacionID || publicacionID.length < 1) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }

  const peticiones = await PeticionRepository.leerVariasPorPublicacion(publicacionID)
  return res.json(responseJSON(true, 'peticiones_retornas', 'Peticiones Obtenidas', peticiones))
})

const modificaPeticion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioID, obj_peticion: objPeticion } = req.body

  if (!id || id.length < 1 || !objPeticion) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }

  const peticion = await PeticionRepository.actualizar(id, objPeticion)
  const usuario = await UsuarioRepository.leerPorID(usuarioID)

  return res.json(responseJSON(true, 'peticion_modificada', 'Peticiones Modificada', [usuario, peticion]))
})

const calificacionEmisor = asyncHandler(async (req, res) => {
  const { id, calificacion, jwt_usuario_id: usuarioID } = req.body

  if (!id || !calificacion) {
    return res.json(responseJSON(false, 'peticion-faltan_parametros', 'Error parametros', ['id', 'calificacion']))
  }

  const peticion = await PeticionRepository.leerParaCalificacionEmisior(id, usuarioID, calificacion)

  if (!peticion) {
    return res.json(responseJSON(false, 'peticion-no_encontrada', 'Peticion no encontradad', []))
  }
  return res.json(responseJSON(true, 'peticion-calificacion_realizada', 'Calificacion Realizada', peticion))
})

const calificacionReceptor = asyncHandler(async (req, res) => {
  const { id, calificacion, jwt_usuario_id: usuarioID } = req.body

  if (!id || !calificacion) {
    return res.json(responseJSON(false, 'peticion-faltan_parametros', 'Error parametros', ['id', 'calificacion']))
  }

  const peticion = await PeticionRepository.leerParaCalificacionReceptor(id, usuarioID, calificacion)

  if (!peticion) {
    return res.json(responseJSON(false, 'peticion-no_encontrada', 'Peticion no encontradad', []))
  }
  return res.json(responseJSON(true, 'peticion-calificacion_realizada', 'Calificacion Realizada', peticion))
})

module.exports = {
  crearPeticion,
  modificaPeticion,
  obtenerUnaPeticion,
  peticionesPorPublicacion,
  calificacionEmisor,
  calificacionReceptor,
  misPeticiones
}
