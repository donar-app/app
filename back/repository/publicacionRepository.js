const PublicacionModel = require('../models/publicacionModel')
class PublicacionRepository {
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

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

  async obtenerParaPeticion (id, usuarioID) {
    return await this.model.findOne({
      _id: id,
      anunciante_id: { $ne: usuarioID }
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

  async actualizarPorID (id, object) {
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

  async eliminar (id, usuarioID) {
    return await this.model.findOneAndUpdate(
      { _id: id, anunciante_id: usuarioID },
      { estado: 'eliminada' }
    )
  }
}

module.exports = new PublicacionRepository(PublicacionModel)
