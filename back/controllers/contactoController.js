'use strict'

const Contacto = require('../models/contactoModel')
const { responseJSON } = require('../utils/responseJSON')

const crearContacto = async (objContacto) => {
  if (!objContacto) {
    return responseJSON(false, 'contacto_error', 'Faltan parametros', ['obj_contacto'])
  }

  const bufferContacto = new Contacto({
    nombre: objContacto.nombre,
    correo: objContacto.correo,
    titulo: objContacto.titulo,
    mensaje: objContacto.mensaje,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  })

  const contacto = await bufferContacto.save()

  if (!contacto) {
    return responseJSON(false, 'contacto_no_guardado', 'Error en guardar sugerencia', [])
  }

  return responseJSON(true, 'contacto_registrado', 'Gracias por Contactarnos', contacto)
}

module.exports = {
  crearContacto
}
