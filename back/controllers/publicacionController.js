'use strict'

const fs = require('fs')
const path = require('path')
const Publicacion = require('../models/publicacionModel')
const isImage = require('../utils/is-image')
const createImage = require('../utils/create-image')

const { ResourceNotFound, ResourceNotImage } = require('../errors')

const getAllPublications = async () => {
  const resp = await Publicacion.find({ estado: 'Publicado' })

  for await (const publi of resp) {
    publi.imagenRoute = await fs.readFileSync(path.resolve(__dirname, `../uploads/${publi.imagenRoute}.png`), 'base64')
    // publi.imagenRoute = await createImage(publi.imagenRoute);
  }

  return resp
}

const getPublication = async (id) => {
  try {
    const resp = await Publicacion.findById(id)

    // resp.imagenRoute = await createImage(resp.imagenRoute);
    resp.imagenRoute = await fs.readFileSync(path.resolve(__dirname, `../uploads/${publi.imagenRoute}.png`), 'base64')
    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const createPublication = async (publicacion) => {
  const { jwt_usuario_id: id, titulo, categoria, descripcion, tipo, imagenRoute } = publicacion
  // let imagen =  Buffer.from(imagenRoute, 'base64');
  const nameFile = `${id}-${new Date().getTime()}`
  // let buff = new Buffer(imagenRoute, 'base64');
  await fs.writeFileSync(path.resolve(__dirname, `../uploads/${nameFile}.png`), imagenRoute)

  // if ( !isImage( imagen ) ) throw new ResourceNotImage();

  // fs.writeFileSync(path.resolve( __dirname, `../uploads/${nameFile}`), imagenRoute, 'base64')

  const nuevaPublicacion = new Publicacion({
    id,
    titulo,
    categoria,
    descripcion,
    tipo,
    creado_en: new Date(),
    actualizada_en: new Date(),
    imagen: nameFile,
    estado: 'Publicado'
  })

  const publicacionSaved = await nuevaPublicacion.save()
  return publicacionSaved
}

const updatePublication = async (id, publicacion) => {
  const { titulo, categoria, descripcion, tipo, imagen } = publicacion

  if(imagen) {
    const imagenBuff = Buffer.from(imagen, 'base64')
    if (!isImage(imagenBuff)) throw new ResourceNotImage()
  }

  const publi = await Publicacion.findById(id)

  fs.writeFileSync(path.resolve(__dirname, `../uploads/${publi.imagen}`), imagen, 'base64')

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
