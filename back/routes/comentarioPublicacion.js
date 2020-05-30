'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('./middlewares/async-handler');

/**
 * Crear comentario
 */
router.post('/', asyncHandler(async (req, res, next)) => {
    res.json({
        _id: 1,
        pregunta: '¿Está disponible?',
        respuesta: null,
        donacion_id: 1,
        usuario_id: 1,
    });
});