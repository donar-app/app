'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { getPeticion, createPeticion, updatePeticion } = require('../controllers/peticion');
const { NotHavePermissions } = require('./../errors');
const { getPublication } = require('../controllers/publicacion');

/**
 * Crear peticion
 */
router.post('/', asyncHandler(async (req, res, next) => {
    // obtener usuario del token
    const usuario_id = req.body.jwt_usuario_id;
    const publicacion_id = req.body.publicacion_id;
    // Verificar permisos
    const publicacion = await getPublication(publicacion_id);

    if(String(publicacion.anunciante_id) !== String(usuario_id)){

        res.json( await createPeticion({
            usuario_id,
            publicacion_id
        }));

    } else {

        throw new NotHavePermissions();

    }
}));

/**
 * Aceptar peticion
 */
router.put('/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // verificar si el usuario es el dueño de la publicación
    // obtener usuario del token
    const usuario_id = req.body.jwt_usuario_id;
    const publicacion_id = req.body.publicacion_id;
    // Verificar permisos
    const peticion = await getPeticion(id);
    const publicacion = await getPublication(peticion.publicacion_id);

    if(String(publicacion.anunciante_id) === String(usuario_id)){

        res.json( await updatePeticion(id, {
            es_aceptada: req.body.es_aceptada
        }));

    } else {

    }
}));

module.exports = router;