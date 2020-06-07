var express = require('express')
var router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { responseJSON } = require('../utils/responseJSON')
const { crearContacto } = require('../controllers/contactoController')

/**
 * Contacto con la plataforma
 * @param {string} nombre nombre de la personas que nos contacta
 * @param {string} correo correo electronico del usuario
 * @param {string} titulo titulo del contacto. Max 50 caracteres
 * @param {string} mensaje Mensaje del contacto. Max 500 caracteres
 * @returns {JSON} Retorna todo el documento "contacto".
 */
router.post('/', asyncHandler(async (req, res, next) => {
  const { obj_contacto: objContacto } = req.body

  const resultado = await crearContacto(objContacto)

  return res.json(resultado)
}))

module.exports = router
