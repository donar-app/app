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
  const { nombre, correo, titulo, mensaje } = req.body

  if (!nombre || !correo || !titulo || !mensaje) {
    return res.json(responseJSON(false, 'contacto_error', 'Faltan parametros', ['nombre', 'correo', 'titulo', 'mensaje']))
  }

  const bufferContacto = {
    nombre,
    correo,
    titulo,
    mensaje,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }

  const contacto = await crearContacto(bufferContacto)

  return res.json(responseJSON(true, 'contacto_registrado', 'Gracias por Contactarnos', contacto))
}))

module.exports = router
