'use strict'

const fs = require('fs')
const path = require('path')
const Publicacion = require('../models/publicacionModel')
const { getPreguntasPublicationes } = require('../controllers/preguntaPublicacionController')
const isImage = require('../utils/is-image')
const createImage = require('../utils/create-image')
const mongoose = require('mongoose')

const { ResourceNotFound, ResourceNotImage } = require('../errors')

const getAllPublications = async () => {
  try {
    const resp = await Publicacion.find({ estado: 'Publicado' })
    .populate({
      path:'anunciante', 
      select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
    })
    .map(async publicacion => {
      const preguntas = await getPreguntasPublicationes(publicacion._id);
      publicacion.preguntas = preguntas ? preguntas.map( preg => preg._id ) : [];

      return publicacion;
    })

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const getPublication = async (id) => {
  try {
    const resp = await Publicacion.findById(id)

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const createPublication = async (publicacion) => {
  const { jwt_usuario_id: id, titulo, categoria, descripcion, tipo, imagen } = publicacion
  const imagen64 = imagen.replace(/^data:image\/\w+;base64,/, '');
  const nameFile = `${id}-${new Date().getTime()}`
  let buff = new Buffer(imagen64, 'base64');
  
  // await fs.writeFileSync(path.resolve(__dirname, `../uploads/${nameFile}.png`), imagen)

  if ( !isImage( buff ) ) throw new ResourceNotImage();

  fs.writeFileSync(path.resolve( __dirname, `../uploads/${nameFile}.png`), buff, 'base64')

  const nuevaPublicacion = new Publicacion({
    anunciante_id: id,
    titulo,
    categoria,
    descripcion,
    tipo,
    creado_en: new Date(),
    actualizada_en: new Date(),
    imagen: `${nameFile}.png`,
    estado: 'Publicado'
  })

  const publicacionSaved = await nuevaPublicacion.save()
  return publicacionSaved
}

const updatePublication = async (id, publicacion) => {
  const { titulo, categoria, descripcion, tipo, imagen } = publicacion
  const imagen64 = imagen.replace(/^data:image\/\w+;base64,/, '');
  let buff = new Buffer(imagen64, 'base64');

  const publi = await Publicacion.findById(id)

  if ( !isImage( buff ) ) throw new ResourceNotImage();

  fs.writeFileSync(path.resolve(__dirname, `../uploads/${publi.imagen}`), imagen64, 'base64')

  const publicacionUpdated = await Publicacion.findOneAndUpdate(id, {
    titulo,
    categoria,
    descripcion,
    tipo,
    imagen: publi.imagen,
    actualizada_en: new Date()
  }, { new: true })

  return publicacionUpdated
}

const deletePublication = async (id) => {
  const publicacionDelete = await Publicacion.findOneAndUpdate(id, { estado: 1 })
  return publicacionDelete
}

module.exports = {
  getAllPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication
}
