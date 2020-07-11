const ContactoModel = require('../models/contactoModel')
const DefaultRepository = require('../repository/defaultRepository')

class ContactoRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {ContactoModel} model Modelo de la coleccion Contacto
   */
  super (model) {
    this.model = model
  }
}

module.exports = new ContactoRepository(ContactoModel)
