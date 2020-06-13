const IpModel = require('../models/ipModel')
const DefaultRepository = require('../repository/defaultRepositoy')
class IpRepository extends DefaultRepository {}

module.exports = new IpRepository(IpModel)
