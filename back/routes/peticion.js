'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { createPeticion, updatePeticion } = require('../controllers/peticion');

/**
 * Crear peticion
 */
router.post('/', asyncHandler(async (req, res, next) => {
    // obtener usuario del token
    const usuario_id = req.body.usuario_id;

    res.json( await createPeticion({
        usuario_id,
        publicacion_id: req.body.publicacion_id
    }));
}));

/**
 * Aceptar peticion
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // verificar si el usuario es el dueño de la publicación
    res.json( await updatePeticion(id, {
        es_aceptada: req.body.es_aceptada
    }));
}));

module.exports = router;