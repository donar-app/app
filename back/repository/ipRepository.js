const IpModel = require('../models/ipModel')
class IpRepository {
  /**
   * Cargamos todos los metodos que contiene mongoose
   * @param {IpModel} model Modelo de la coleccion Ip
   */
  constructor (model) {
    this.model = model
  }

  async obtenerTodas () {
    return await this.model.find()
  }

  async guardar (ip) {
    return await this.model.create(ip)
  }
}

module.exports = new IpRepository(IpModel)
