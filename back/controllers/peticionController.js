'use strict'

const Peticion = require('../models/peticionModel')
const { ResourceNotFound } = require('../errors/not-found')

const getPeticiones = async (id) => {
  const resp = await Peticion.find({ publicacion_id: id })
  return resp
}

const getPeticion = async (id) => {
  try {
    const resp = await Peticion.findById(id)

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const createPeticion = async (peticionObject) => {
  const peticion = new Peticion(peticionObject)

  return await peticion.save()
}

const updatePeticion = async (id, peticion) => {
  return await Peticion.findOneAndUpdate(
    { _id: id },
    peticion,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
}

module.exports = {
  createPeticion,
  updatePeticion,
  getPeticion,
  getPeticiones
}
