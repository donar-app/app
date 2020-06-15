const PreguntaModel = require('../models/preguntaModel')

class PreguntaRepository {
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
  }
}

module.exports = new PreguntaRepository(PreguntaModel)
