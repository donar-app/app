var express = require('express');
var router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const {responseJSON} = require('../utils/responseJSON');
const { crearContacto } = require('../controllers/contactoController');

/**
 * Contacto con la plataforma
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/', asyncHandler(async(req, res, next) =>{
  const {nombre,email,titulo,mensaje} = req.body;

  if (!nombre || !email || !titulo || !mensaje) {
    return res.json(responseJSON(false,"contacto_error","Faltan parametros",["nombre","email","titulo","mensaje"]))  
  }

  const bufferContacto = {
    nombre,email,titulo,mensaje,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }

  const contacto = await crearContacto(bufferContacto)

  return res.json(responseJSON(true,"contacto_registrado","Gracias por Contactarnos",contacto))
}));

module.exports = router;