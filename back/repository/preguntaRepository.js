const PreguntaModel = require('../models/preguntaModel')

class PreguntaRepository {
  async obtenerPreguntasPorPublicacion (id) {
    return await this.model.find({ publicacion_id: id })
  }

  async responderPregunta (id, usuarioID, respuesta) {
    return await this.model.findOneAndUpdate(
      { _id: id, usuario_id: usuarioID, respuesta: null },
      { respuesta: respuesta },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

module.exports = new PreguntaRepository(PreguntaModel)
