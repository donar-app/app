'use strict'
const multer = require('multer')
const fs = require('fs')

const validOneFile = async (request, response, nameFile, isRequired) => {
  return new Promise((resolve) => {
    const upload = multer({ dest: 'uploads/' }).single(nameFile)
    return upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        resolve({ error: 'not-file', mensaje: 'No es un archivo' })
      } else if (err) {
        resolve({ error: 'not-file', mensaje: 'No es un archivo' })
      } else if (!request.file && isRequired) {
        resolve({ error: 'file-not-found', mensaje: 'Archivo no encontrado' })
      } else if (request.file.mimetype !== 'image/jpeg' && request.file.mimetype !== 'image/png') {
        resolve({ error: 'no-es-imagen', mensaje: 'Archivo no es una imagen' })
      }
      let newFilename = null
      if (request.file) {
        const filename = request.file.filename
        const extensionFile = request.file.mimetype.substring(6, request.file.mimetype.length)
        newFilename = `${filename}.${extensionFile}`
        fs.renameSync(`uploads/${filename}`, `uploads/${newFilename}`)
      }
      resolve({ error: null, body: request.body, filename: newFilename, url: `http://${request.headers.host}/public/publicaciones/${newFilename}` })
    })
  })
    .then(result => result)
    .catch(error => {
      return { error: 'error-interno', mensaje: error.message }
    })
}

const validManyFiles = async (request, response, destinoImagenes, nombreInput, cantidadImagenes) => {
  return new Promise((resolve) => {
    const upload = multer({ dest: destinoImagenes }).array(nombreInput, cantidadImagenes)
    return upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        resolve({ error: 'not-file', mensaje: 'No es un archivo.' })
      } else if (err) {
        resolve({ error: 'not-file', mensaje: 'No es un archivo..' })
      } else if (!request.files) {
        resolve({ error: 'file-not-found', mensaje: 'Archivo no encontrado' })
      }

      const { files } = request
      const host = request.headers.host

      const error = files.find(file => file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')

      if (error) {
        resolve({ error: 'no-es-imagen', mensaje: `Archivo ${error.originalfilename} no es una imagen` })
      }

      const imagenes = files.map(file => {
        const filename = file.filename
        const extensionFile = file.mimetype.substring(6, file.mimetype.length)
        const newFilename = `${filename}.${extensionFile}`
        fs.renameSync(`${destinoImagenes}${filename}`, `${destinoImagenes}${newFilename}`)
        return { nombre: newFilename, url: `http://${host}/public/publicaciones/${newFilename}` }
      })

      resolve({ error: null, body: request.body, imagenes })
    })
  })
    .then(result => result)
    .catch(error => {
      return { error: 'error-interno', mensaje: error.message }
    })
}

module.exports = {
  validOneFile,
  validManyFiles
}
