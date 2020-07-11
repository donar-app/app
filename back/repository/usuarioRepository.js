const UsuarioModel = require('../models/usuarioModel')
const DefaultRepository = require('../repository/defaultRepository')

class UsuarioRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {UsuarioModel} model Modelo de la coleccion Usuario
   */
  super (model) {
    this.model = model
  }

  async leerUnoPorParametros (parametros) {
    try {
      const resultObjeto = await this.model.findOne(parametros)
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      return this.responseDB(error.message, 'error-data')
    }
  }

  async crear (objeto) {
    try {
      const resultObjeto = await this.model.create(objeto)
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      if (error.keyValue) {
        if (Object.prototype.hasOwnProperty.call(error.keyValue, 'correo')) {
          return this.responseDB('Correo ya registrado', 'correo-duplicado')
        }
        if (Object.prototype.hasOwnProperty.call(error.keyValue, 'alias')) {
          return this.responseDB('Alias ya registrado', 'alias-duplicado')
        }
      }

      return this.responseDB(error.message, 'error_en_propiedades')
    }
  }

  async inhabilitar (id) {
    try {
      const resultObjeto = await this.model.findOneAndUpdate(
        { _id: id },
        { es_activo: false },
        {
          new: true,
          runValidators: true,
          context: 'query'
        }
      )
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      return this.responseDB(error.message, 'error-data')
    }
  }
}

module.exports = new UsuarioRepository(UsuarioModel)
