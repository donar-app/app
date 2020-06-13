const IpModel = require('../models/ipModel')
class IpRepository {
  constructor (model) {
    this.model = model
  }

  async obtenerTodas () {
    return await this.model.find()
  }
}

module.exports = new IpRepository(IpModel)
