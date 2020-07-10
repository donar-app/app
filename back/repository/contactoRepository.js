const ContactoModel = require('../models/contactoModel')
class ContactoRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {ContactoModel} model Modelo de la coleccion Contacto
   */
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
  }

  async obtenerVariasPorPublicacion (id) {
    return await this.model.find({ publicacion_id: id })
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

module.exports = new ContactoRepository(ContactoModel)
