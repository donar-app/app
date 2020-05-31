var express = require('express');
var router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const {responseJSON} = require('../utils/responseJSON');

/**
 * Login de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/', asyncHandler(async(req, res, next) =>{
  res.json(responseJSON(true,"contacto_registrado","Gracias por Contactarnos",[]))
}));
