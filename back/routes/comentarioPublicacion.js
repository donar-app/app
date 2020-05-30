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
        pregunta: req.body.pregunta,
        donacion_id: req.body.donacion_id,
        usuario_id: req.body.usuario_id,
    }));
}));

/**
 * Modificar comentario
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
    // verificar si el usuario es el dueño de la publicación
    res.json( await updateComentarioPublication(1, {
        respuesta: req.body.respuesta
    }));
}));

module.exports = router;