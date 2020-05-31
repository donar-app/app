'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { getComentarioPublication, createComentarioPublication, updateComentarioPublication } = require('../controllers/comentarioPublicacion');
const { getPublication } = require('../controllers/publicacion');
const { NotHavePermissions } = require('./../errors');

/**
 * Crear comentario
 */
router.post('/', asyncHandler(async (req, res, next) => {
    const publicacion_id = req.body.publicacion_id;
    const usuario_id = req.body.jwt_usuario_id;
    
    const publicacion = await getPublication(publicacion_id);
    if(publicacion.anunciante_id !== usuario_id){

        res.json( await createComentarioPublication({
            pregunta: req.body.pregunta,
            publicacion_id: publicacion_id,
            usuario_id: usuario_id,
        }));

    } else {

        throw new NotHavePermissions();

    }

}));

/**
 * Modificar comentario
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // verificar si el usuario es el dueño de la publicación
    const usuario_id = req.body.jwt_usuario_id;

    const comentario = await getComentarioPublication(id);
    const publicacion = await getPublication(comentario.publicacion_id);

    if(publicacion.anunciante_id === usuario_id){
        res.json( await updateComentarioPublication(id, {
            respuesta: req.body.respuesta
        }));
    } else {

        throw new NotHavePermissions();

    }

}));

module.exports = router;