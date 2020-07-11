const IpModel = require('../models/ipModel')
const DefaultRepository = require('../repository/defaultRepository')

class IpRepository extends DefaultRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {IpModel} model Modelo de la coleccion Ip
   */
  super (model) {
    this.model = model
  }
}

module.exports = new IpRepository(IpModel)
