'use strict'

const { code } = require('./symbols')

module.exports = {
    ResourceNotFound: require('./not-found'),
    ResourceNotImage: require('./not-image'),
    NotHavePermissions: require('./not-permissions'),
    code
}