const express = require('express');

const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const handlerToken = require('../middlewares/seguridad');
const {generaStringRandom} = require("../utils/myUtils")
const { crearUsuario,obtenerUsuario,obtenerUsuarioPorAlias } = require('../controllers/usuarioController');
const bcrypt = require('bcryptjs');
const SALT = bcrypt.genSaltSync(10);

/**
 * Login de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/login', asyncHandler(async (req, res) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(200).json({ message: 'Sin Credenciales' });
  }

  const [tipo,credencialesEnbase64] = authorization.split(' ');

  if (!tipo || !credencialesEnbase64 || tipo !== 'Basic') {
    return res.status(200).json({ message: 'Error en Credenciales' });
  }

  const [alias,clave] =  Buffer.from(credencialesEnbase64,'base64').toString('utf8').split(':');

  if (!alias || !clave) {
    return res.status(200).json({ message: 'Error en Credenciales.' });
  }

  const usuario = await obtenerUsuarioPorAlias(alias)

  if (!usuario) {
    return res.json({
      mensaje: "alias o clave invalido",
    });
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave);

  if (!validaClave) {
    return res.json({
      mensaje: "alias o clave invalido",
    });
  }

  const token = await handlerToken.crearToken({ id: usuario.id, alias: usuario.alias });
  await handlerToken.setTokenEnCabecera(res, token);
  
  usuario.clave = undefined

  res.json({
    usuario: usuario,
  });
}));

/**
 * Registro de Usuario
 * @param {string} correo correo electronico del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token
 */
router.post('/registro', asyncHandler(async (req, res) => {

  //const clave = generaStringRandom(8);

  if (!req.body.alias) {
    res.json({
      "mensaje" : "falta parametro alias"
    });
  }
  const clave = await bcrypt.hashSync(req.body.alias, SALT);
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
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  };  

  const resultUsuario = await crearUsuario(bufferUsuario)
  resultUsuario.clave = undefined
  return res.json({
    usuario: resultUsuario
  });
}));

module.exports = router;
