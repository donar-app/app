'use strict'

const ContactoRepository = require('../repository/contactoRepository')
const { responseJSON } = require('../utils/responseJSON')
const asyncHandler = require('../middlewares/async-handler')

const crearContacto = asyncHandler(async (req, res, next) => {
  const { obj_contacto: objContacto } = req.body
  if (!objContacto) {
    return res.json(responseJSON(false, 'contacto-error_parametros', 'Faltan parametros', ['obj_contacto']))
  }

  objContacto.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const { objeto: contacto } = await ContactoRepository.crear(objContacto)

  if (!contacto) {
    return res.json(responseJSON(false, 'contacto-no_guardado', 'Error en guardar sugerencia', []))
  }

  return res.status(201).json(responseJSON(true, 'contacto-registrado', 'Gracias por Contactarnos', contacto))
})

module.exports = {
  crearContacto
}
