'use strict'

const { code } = require('./symbols')

class ResourceNotFound extends Error {
  constructor (message = 'Not Found', ...args) {
    super(message, ...args)

    this[code] = 404
  }
}

module.exports = ResourceNotFound
