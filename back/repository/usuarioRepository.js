const UsuarioModel = require('../models/usuarioModel')
class UsuarioRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {UsuarioModel} model Modelo de la coleccion Usuario
   */
  constructor (model) {
    this.model = model
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
  }

  async obtenerUnoPorParametros (parametros) {
    return await this.model.findOne(parametros)
  }

  async guardar (objecto) {
    return await this.model.create(objecto)
  }

  async actualizar (id, usuario) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      usuario,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async eliminar (id) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { es_activo: false },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

module.exports = new UsuarioRepository(UsuarioModel)
