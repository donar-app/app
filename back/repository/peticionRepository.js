const PeticionModel = require('../models/peticionModel')
const DefaultRepository = require('../repository/defaultRepository')

class PeticionRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {PeticionModel} model Modelo de la coleccion Peticion
   */
  super (model) {
    this.model = model
  }

  async obtenerVariasPorPublicacion (id) {
    return await this.model.find({ publicacion_id: id })
  }

  async obtenerMisPeticiones (id) {
    return await this.model.find({ usuario_id: id })
  }

  async obtenerParaCalificacionEmisior (id, usuarioID, calificacion) {
    return await this.model.findOneAndUpdate({ _id: id, usuario_id: { $ne: usuarioID } }, calificacion).populate('Publicacion')
  }
}

module.exports = new PeticionRepository(PeticionModel)
