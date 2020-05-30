const express = require('express');

const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { actualizarUsuario,eliminarUsuario,obtenerUsuario } = require('../controllers/usuarioController');


/**
 * Editar un usuario ya existente
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.put('/', asyncHandler(async (req, res) => {

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
    actualizado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }; 

  actualizarUsuario(req.jwt_usuario_id,bufferUsuario)
}));

/**
 * Obtener un usuario. Obtenemos el alias del token y asi recuperarlo de la db.
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.get('/', asyncHandler(async (req, res) => {
  const usuario = await obtenerUsuario(req.body.jwt_usuario_id)
  res.json(usuario);
}));

/**
 * Cambiar el estado "false" de un usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.delete('/', asyncHandler(async (req, res) => {
  
}));

module.exports = router;
