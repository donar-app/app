const UsuarioModel = require('../models/usuarioModel')
class UsuarioRepository {
  constructor (model) {
    this.model = model
  }

  async obtenerPorAlias (alias) {
    return await this.model.findOne({ alias: alias, es_activo: true })
  }

  async obtenerUnoPorParametros (parametros) {
    return await this.model.findOne(parametros)
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
}

module.exports = new UsuarioRepository(UsuarioModel)
