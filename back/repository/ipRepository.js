const IpModel = require('../models/ipModel')
class IpRepository {
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
