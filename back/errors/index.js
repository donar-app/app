'use strict'

const { code } = require('./symbols')

module.exports = {
    ResourceNotFound: require('./not-found'),
    NotHavePermissions: require('./not-permissions'),
    code
}