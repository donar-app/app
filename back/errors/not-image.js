'use strict'

const { code } = require('./symbols')

class ResourceNotImage extends Error {
  constructor (message = 'Not Image File', ...args) {
    super(message, ...args)

    this[code] = 406
  }
}

module.exports = ResourceNotImage
