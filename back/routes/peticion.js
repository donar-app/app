'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { createPeticion, updatePeticion } = require('../controllers/peticion');

/**
 * Crear peticion
 */
router.post('/', asyncHandler(async (req, res, next) => {
    const usuario_id = 1;

    res.json( await createPeticion({
        usuario_id,
        donacion_id: req.body.donacion_id
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