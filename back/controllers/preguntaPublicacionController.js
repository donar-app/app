'use strict'

const PreguntaPublicacion = require('../models/preguntaPublicacionModel')
const { ResourceNotFound } = require('../errors/not-found')

const getPreguntasPublicationes = async (id) => {
  try {
    const resp = await PreguntaPublicacion.find({ publicacion_id: id })

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const getPreguntaPublication = async (id) => {
  try {
    const resp = await PreguntaPublicacion.findById(id)

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const createPreguntaPublication = async (preguntaPublicacionObject) => {
  const preguntaPublicacion = new PreguntaPublicacion(preguntaPublicacionObject)

  return await preguntaPublicacion.save()
}

const updatePreguntaPublication = async (id, preguntaPublicacion) => {
  return await PreguntaPublicacion.findOneAndUpdate(
    { _id: id },
    preguntaPublicacion,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
}

module.exports = {
  createPreguntaPublication,
  updatePreguntaPublication,
  getPreguntaPublication,
  getPreguntasPublicationes
}
