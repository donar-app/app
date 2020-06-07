const UsuarioModel = require('../models/usuarioModel')
const DefaultRepostory = require('../repository/defaultRepositoy')
class UsuarioRepository extends DefaultRepostory {
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
