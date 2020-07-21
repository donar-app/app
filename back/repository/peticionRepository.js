const PeticionModel = require('../models/peticionModel')
class PeticionRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {PeticionModel} model Modelo de la coleccion Peticion
   */
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
  }

  async obtenerVariasPorPublicacion (id) {
    return await this.model.find({ publicacion_id: id })
  }

  async obtenerMisPeticiones (id) {
    return await this.model.find({ usuario_id: id })
      .populate('publicacion')
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

  async obtenerParaCalificacionEmisior (id, usuarioID, calificacion) {
    return await this.model.findOneAndUpdate({ _id: id, usuario_id: { $ne: usuarioID } }, calificacion).populate('Publicacion')
  }
}

module.exports = new PeticionRepository(PeticionModel)
