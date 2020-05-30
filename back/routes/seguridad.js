const express = require('express');

const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const handlerToken = require('../middlewares/seguridad');

/**
 * Login de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/login', asyncHandler(async (req, res) => {
  const usuarioM = {
    id: '123',
    nombre: 'Abbul',
    apellido: 'Rodriguez',
    alias: 'aro',
    email: 'arodirguez@hotmail.com',
    es_receptor: true,
    pais: 'ar',
    ciudad: 'capital',
    direccion: 'calle los arboles',
    telefono: '54911555444',
    es_fundacion: false,
    es_acopio: false,
    es_activo: true,
    creada_en: '2020-01-01 12:12:12',
    actualizada_en: '2020-05-05 12:12:12',
  };

  const token = await handlerToken.crearToken({ id: usuarioM.id, alias: usuarioM.alias });
  await handlerToken.setTokenEnCabecera(res, token);

  res.json({
    usuario: usuarioM,
  });
}));

/**
 * Login de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/registro', asyncHandler(async (req, res) => {

  const passwordRandom = generateRandomString(8);
  const clave = await bcrypt.hashSync(req.body.usuario, SALT);

  const bufferUsuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    alias: req.body.alias,
    email: req.body.email,
    clave : clave,
    es_receptor: req.body.receptor,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    es_fundacion: req.body.fundacion,
    es_acopio: req.body.acopio,
    es_activo: req.body.activo,
    creada_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  };

  await handlerToken.setTokenEnCabecera(res, token);

  res.json({
    usuario: usuarioM,
  });
}));

module.exports = router;
