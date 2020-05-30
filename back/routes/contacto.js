var express = require('express');
var router = express.Router();
const asyncHandler = require('../middlewares/async-handler');

/**
 * Login de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/', asyncHandler(async(req, res, next) =>{
    res.json({
      "usuario" : {
        "nombre" : "Abbul Rdoriguez",
        "email" : "asd@hotmail.com",
        "titulo" : "Comentario",
        "mensaje" : "Hola, anda de 10"
    },
    "result" : "success"
    })
}));
