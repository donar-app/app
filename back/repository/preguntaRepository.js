const PreguntaModel = require('../models/preguntaModel')
const PublicacionModel = require('../models/publicacionModel')

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
  }

  async obtenerPreguntasPorUsuario (usuarioID) {
    return await this.model.find({ usuario_id: usuarioID })
      .populate({
        path: 'publicacion'
      })
  }

  async obtenerRespuestasPorUsuario (usuarioID) {
    const publicaciones = await PublicacionModel.find({ anunciante_id: usuarioID })
    const publicacionesId = publicaciones.map(publicacion => String(publicacion._id))

    return await this.model.find({
      publicacion_id: {
        $in: publicacionesId
      }
    })
      .populate({
        path: 'publicacion'
      })
  }
}

module.exports = new PreguntaRepository(PreguntaModel)
