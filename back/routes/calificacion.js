'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { createPeticion, updatePeticion } = require('../controllers/peticion');

/**
 * Calificar petición emisor
 */
router.post('/:id/emisor', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // verificar si el usuario es el dueño de la publicación
    res.json( await updatePeticion(id, {
        es_entregada: req.body.es_entregada,
        calificacion_emisor: req.body.calificacion_emisor,
    }));
}));

/**
 * Calificar petición receptor
 */
router.post('/:id/receptor', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // verificar si el usuario es el dueño de la publicación
    res.json( await updatePeticion(id, {
        es_recibida: req.body.es_recibida,
        calificacion_receptor: req.body.calificacion_receptor,
    }));
}));

module.exports = router;