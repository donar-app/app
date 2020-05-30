const express = require('express');

const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');


/**
 * Editar un usuario ya existente
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.put('/', asyncHandler(async (req, res) => {
  res.json({
    usuario: {
      _id: '123',
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
    },
  });
}));

/**
 * Obtener un usuario. Obtenemos el alias del token y asi recuperarlo de la db.
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    usuario: {
      _id: '123',
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
    },
  });
}));

module.exports = router;
