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
        "_id" : "123",
        "nombre" : "Abbul",
        "apellido" : "Rodriguez",
        "alias" : "aro",
        "email" :"arodirguez@hotmail.com",
        "es_receptor" : true,
        "pais" : "ar",
        "ciudad" : "capital",
        "direccion" : "calle los arboles",
        "telefono" : "54911555444",
        "es_fundacion" : false,
        "es_acopio" : false,
        "es_activo" : true,
        "creada_en" : "2020-01-01 12:12:12",
        "actualizada_en" : "2020-05-05 12:12:12"
    }
    })
}));
