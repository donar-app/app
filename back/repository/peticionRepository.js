const PeticionModel = require('../models/peticionModel')
class PeticionRepository {
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
