const { Model } = require('mongoose')

class DefaultRepository {
  /**
  * Cargamos todos los metodos que contiene mongoose
  * @param {Model} model Modelo de la coleccion Usuario
  */
  constructor (model) {
    this.model = model
  }

  /**
   *
   * @param {Object} objeto Documento que sera persistido.
  */
  async crear (objeto) {
    try {
      const resultObjeto = await this.model.create(objeto)
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      return this.responseDB(error.message, 'error-data')
    }
  }

  /**
   *
   * @param {String} id Id del documento a buscar.
   */
  async leerPorID (id) {
    try {
      const resultObjeto = await this.model.findById(id)
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      return this.responseDB(error.message, 'error-data')
    }
  }

  /**
   * Obtener todos los documentos
   */
  async leerTodos () {
    try {
      const resultObjeto = await this.model.find()
      return this.responseDB(null, 'ok', resultObjeto)
    } catch (error) {
      return this.responseDB(error.message, 'error-data')
    }
  }

  /**
   *
   * @param {String} id Id del documento a ser actualizado.
   * @param {Object} objeto Es el objeto a modificar
   */
  async actualizarPorID (id, objeto) {
    try {
      const resultObjeto = await this.model.findOneAndUpdate(
        { _id: id },
        objeto,
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

  /**
   *
   * @param {String} id Id del documento a ser eliminado.
   */
  async eliminarPorID (id) {
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

  /**
   * Respuesta unificada de la base de datos.
   * @param {String | null} error Es el mensaje que se regresara por el resultado de la consulta
   * @param {String} codigo Es el codigo para identificar el resultado de la consulta
   * @param {Object | null} objeto Es el resultado del objeto realacionado con la consulta. se envia null si ocurre un error
   */
  responseDB (error, codigo, objeto = null) {
    return { error, codigo, objeto }
  }
}

module.exports = DefaultRepository
