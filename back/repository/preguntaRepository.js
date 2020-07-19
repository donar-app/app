const PreguntaModel = require('../models/preguntaModel')

class PreguntaRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {PreguntaModel} model Modelo de la coleccion Pregunta
   */
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

  async obtenerPreguntasPorPublicacion (id) {
    return await this.model.find({ publicacion_id: id })
  }

  async buscarParaResponder (id, usuarioID, respuesta) {
    return await this.model.findOneAndUpdate(
      { _id: id, usuario_id: { $ne: usuarioID }, respuesta: null },
      { respuesta: respuesta },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
      .aggregate()
  }

  async obtenerPreguntasPorUsuario (usuarioID) {
    return await this.model.find({ usuario_id: usuarioID })
  }
}

module.exports = new PreguntaRepository(PreguntaModel)
