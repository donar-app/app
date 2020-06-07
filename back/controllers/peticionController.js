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

  const publicacion = await PublicacionRepository.obtenerPorID(publicacionID)

  if (!publicacion) {
    return res.json(responseJSON(false, 'peticion-publicacion_nula', 'Publicacion no existe', []))
  }

  objPeticion.publicacion_id = publicacion.id
  objPeticion.usuario_id = usuarioID
  objPeticion.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))
  const peticion = await PeticionRepository.guardar(objPeticion, usuarioID, publicacionID)
  if (!peticion) {
    return res.json(responseJSON(false, 'peticion-error', 'No se puede guardar la peticion', []))
  }
  return res.status(201).json(responseJSON(true, 'peticion_creada', 'Peticion creada', peticion))
})

const obtenerUnaPeticion = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id || id.length < 1) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }
  const peticion = await PeticionRepository.obtenerPorID(id)
  return res.json(responseJSON(true, 'peticion_retornada', 'Peticion Obtenida', peticion))
})

const peticionesPorPublicacion = asyncHandler(async (req, res) => {
  const { publicacion_id: publicacionID } = req.params
  if (!publicacionID || publicacionID.length < 1) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }

  const peticiones = await PeticionRepository.obtenerVariasPorPublicacion(publicacionID)
  return res.json(responseJSON(true, 'peticiones_retornas', 'Peticiones Obtenidas', peticiones))
})

const modificaPeticion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioID, obj_peticion: objPeticion } = req.body

  if (!id || id.length < 1 || !objPeticion) {
    return res.json(responseJSON(true, 'peticion_invalida', 'Error en ID', []))
  }

  const peticion = await PeticionRepository.actualizar(id, objPeticion)
  const usuario = await UsuarioRepository.obtenerPorID(usuarioID)

  return res.json(responseJSON(true, 'peticion_modificada', 'Peticiones Modificada', [usuario, peticion]))
})

const calificacionEmisor = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioID, obj_peticion: objPeticion } = req.body

  /*
  // Verificar permisos
  let peticion = await getPeticion(id)
  const publicacion = await getPublication(peticion.publicacion_id)
  const usuario = await obtenerUsuario(publicacion.anunciante_id)

  if (String(usuarioID) === String(publicacion.anunciante_id)) {
    throw new NotHavePermissions()
  }

  peticion = await updatePeticion(id, {
    es_entregada: req.body.es_entregada,
    calificacion_emisor: req.body.calificacion_emisor
  })
  */
  return responseJSON(true, 'calificacion_emisor', 'La calificacion fue realizada.', [])
})

const calificacionReceptor = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { jwt_usuario_id: usuarioId } = req.body

  /*
  // Verificar permisos
  let peticion = await getPeticion(id)
  const publicacion = await getPublication(peticion.publicacion_id)
  const usuario = await obtenerUsuario(publicacion.anunciante_id)

  if (String(usuarioId) !== String(peticion.usuario_id)) {
    throw new NotHavePermissions()
  }

  peticion = await updatePeticion(id, {
    es_recibida: req.body.es_recibida,
    calificacion_receptor: req.body.calificacion_receptor
  })
  */
  return responseJSON(true, 'califcacion_receptor', 'La calificacion fue realizada.', [])
})

module.exports = {
  crearPeticion,
  modificaPeticion,
  obtenerUnaPeticion,
  peticionesPorPublicacion,
  calificacionEmisor,
  calificacionReceptor
}
