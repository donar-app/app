const PublicacionModel = require('../models/publicacionModel')
const DefaultRepository = require('../repository/defaultRepository')

class PublicacionRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {PublicacionModel} model Modelo de la coleccion Publicacion
   */
  super (model) {
    this.model = model
  }

  async obtenerPorAnunciante (usuarioID) {
    return await this.model.findOne({ anunciante_id: usuarioID })
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

  async eliminar (id, usuarioID) {
    return await this.model.findOneAndUpdate(
      { _id: id, anunciante_id: usuarioID },
      { estado: 'eliminada' }
    )
  }
}

module.exports = new PublicacionRepository(PublicacionModel)
