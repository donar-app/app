'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { createComentarioPublication, updateComentarioPublication } = require('../controllers/comentarioPublicacion');

/**
 * Crear comentario
 */
router.post('/', asyncHandler(async (req, res, next) => {
    res.json( await createComentarioPublication({
        pregunta: '¿Está disponible?',
        respuesta: null,
        donacion_id: 1,
        usuario_id: 1,
    }));
}));

/**
 * Modificar comentario
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
    res.json( await updateComentarioPublication(1, {}) );
}));

module.exports = router;