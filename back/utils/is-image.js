'use strict'

module.exports = (chunk) => {
  const types = [
    {
      ext: 'jpg',
      mime: 'image/jpeg',
      bytes: new Buffer.from([0xff, 0xd8, 0xff])
    },
    {
      ext: 'png',
      mime: 'image/png',
      bytes: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    },
    {
      ext: 'gif',
      mime: 'image/gif',
      bytes: Buffer.from([0x47, 0x49, 0x46, 0x38])
    }
  ]

  for (const type of types) {
    if (chunk.indexOf(type.bytes) === 0) return type
  }

  return false
}
