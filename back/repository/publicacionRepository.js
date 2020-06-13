const PublicacionModel = require('../models/publicacionModel')
class PublicacionRepository {
  async obtenerPublicacionesActivas (pais) {
    return await this.model.find({ estado: 'Publicado', pais: pais })
      .populate({
        path: 'preguntas',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'peticiones',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'anunciante',
        select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
      })
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
      .populate({
        path: 'preguntas',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'peticiones',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'anunciante',
        select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
      })
  }

  async obtenerPorAnuncianteAndID (id, usuarioID) {
    return await this.model.findOne({ _id: id, anunciante_id: usuarioID })
      .populate({
        path: 'preguntas',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'peticiones',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'anunciante',
        select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
      })
  }

  async actualizar (id, object) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      object,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async eliminarPorAnuncianteAndID (id, usuarioID) {
    return await this.model.findOneAndUpdate(
      { _id: id, anunciante_id: usuarioID },
      { elimnado: true }
    )
  }
}

module.exports = new PublicacionRepository(PublicacionModel)
