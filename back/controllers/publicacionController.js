'use strict'

const fs = require('fs')
const path = require('path')
const PublicacionRepository = require('../repository/publicacionRepository')
const isImage = require('../utils/is-image')
const asyncHandler = require('../middlewares/async-handler')
const { responseJSON } = require('../utils/responseJSON')
const { ResourceNotImage } = require('../errors')

const obtenerPublicaciones = asyncHandler(async (req, res) => {
  const { cookie_pais: pais } = req.body
  const publicaciones = await PublicacionRepository.obtenerPublicacionesActivas(pais)
  return res.json(responseJSON(true, 'publicaciones_activas', 'Todas las publicaciones', publicaciones))
})

const obtenerPublicacion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const publicacion = await PublicacionRepository.obtenerPorID(id)

  if (!publicacion) {
    return res.json(responseJSON(false, 'publicacion_no_encontradad', 'Publicacion no encontrada', []))
  }

  return res.json(responseJSON(true, 'publicacion_enviada', 'Publicacion Enviada', publicacion))
})

const crearPublicacion = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id, cookie_pais: pais, titulo, categoria, descripcion, tipo, imagen } = req.body
  const imagen64 = imagen.replace(/^data:image\/\w+;base64,/, '')
  const nameFile = `${id}-${new Date().getTime()}`
  const buff = Buffer.from(imagen64, 'base64')

  // await fs.writeFileSync(path.resolve(__dirname, `../uploads/${nameFile}.png`), imagen)

  if (!isImage(buff)) throw new ResourceNotImage()

  fs.writeFileSync(path.resolve(__dirname, `../uploads/${nameFile}.png`), buff, 'base64')

  const publicacion = await PublicacionRepository.guardar({
    anunciante_id: id,
    titulo,
    categoria,
    descripcion,
    tipo,
    pais,
    creado_en: new Date(),
    actualizada_en: new Date(),
    imagen: `${nameFile}.png`,
    estado: 'Publicado'
  })

  if (!publicacion) {
    return res.json(responseJSON(false, 'publicacion-error_creacion', 'Error al crear la publicacion', []))
  }
  return res.json(responseJSON(true, 'publicacion-creada', 'Publicacion creada', publicacion))
})

const editarPublicacion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { titulo, categoria, descripcion, tipo, imagen } = req.body
  const imagen64 = imagen.replace(/^data:image\/\w+;base64,/, '')
  const buff = Buffer.from(imagen64, 'base64')

  const publicacion = await PublicacionRepository.obtenerPorID(id)

  if (!publicacion) {
    return res.json(responseJSON(false, 'publicacion-no_encontrada', 'Publicacion no existe', []))
  }

  if (!isImage(buff)) throw new ResourceNotImage()

  fs.writeFileSync(path.resolve(__dirname, `../uploads/${publicacion.imagen}`), imagen64, 'base64')

  const publicacionActualizada = await PublicacionRepository.actualizarPorID(id, {
    titulo,
    categoria,
    descripcion,
    tipo,
    imagen: publicacion.imagen,
    actualizada_en: new Date()
  }, { new: true })

  if (!publicacionActualizada) {
    return res.json(responseJSON(false, 'publicacion-error_modificacion', 'Error al modificar la publicacion', []))
  }
  return res.json(responseJSON(true, 'publicacion-creada', 'Publicacion Modificada', publicacionActualizada))
})

const eliminarPublicacion = asyncHandler(async (req, res) => {
  const { id } = req.params
  const publicacionDelete = await PublicacionRepository.eliminarPorID(id)
  if (!publicacionDelete) {
    return res.json(responseJSON(false, 'publicacion-error_eliminacion', 'Error al eliminar la publicacion', []))
  }
  return res.json(responseJSON(true, 'publicacion-eliminada', 'Publicacion Eliminada', publicacionDelete))
})

module.exports = {
  obtenerPublicaciones,
  obtenerPublicacion,
  crearPublicacion,
  editarPublicacion,
  eliminarPublicacion
}
