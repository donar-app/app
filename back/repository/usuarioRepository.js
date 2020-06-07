const UsuarioModel = require('../models/usuarioModel')
class UsuarioRepository {
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
  }

  async obtenerPorAlias (alias) {
    return await this.model.findOne({ alias: alias, es_activo: true })
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
}

module.exports = new UsuarioRepository(UsuarioModel)
