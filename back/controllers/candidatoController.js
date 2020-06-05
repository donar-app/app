'use strict'

const Candidato = require('../models/candidatoModel')
const { ResourceNotFound } = require('../errors/not-found')

const getCandidatos = async (id) => {
  const resp = await Candidato.find({ publicacion_id: id })
  return resp
}

const getCandidato = async (id) => {
  try {
    const resp = await Candidato.findById(id)

    return resp
  } catch (e) {
    if (e.code === 'ENOENT') throw new ResourceNotFound()
    throw e
  }
}

const createCandidato = async (candidatoObject) => {
  const candidato = new Candidato(candidatoObject)

  return await candidato.save()
}

const updateCandidato = async (id, candidato) => {
  return await Candidato.findOneAndUpdate(
    { _id: id },
    candidato,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
}

module.exports = {
  createCandidato,
  updateCandidato,
  getCandidato,
  getCandidatos
}
