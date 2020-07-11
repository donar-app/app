const PreguntaModel = require('../models/preguntaModel')
const DefaultRepository = require('../repository/defaultRepository')

class PreguntaRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {PreguntaModel} model Modelo de la coleccion Pregunta
   */
  super (model) {
    this.model = model
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
}

module.exports = new PreguntaRepository(PreguntaModel)
