'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { getPeticion, createPeticion, updatePeticion } = require('../controllers/peticion');
const { NotHavePermissions } = require('./../errors');
const { getPublication } = require('../controllers/publicacion');

/**
 * Calificar petición emisor
 */
router.post('/:id/emisor', asyncHandler(async (req, res, next) => {
    const { id } = req.params

    // obtener usuario del token
    const usuario_id = req.body.jwt_usuario_id;
    
    // Verificar permisos
    const peticion = await getPeticion(id);
    const publicacion = await getPublication(publicacion_id);
    if(String(usuario_id) === String(publicacion_id.anunciante_id)) {

        res.json( await updatePeticion(id, {
            es_entregada: req.body.es_entregada,
            calificacion_emisor: req.body.calificacion_emisor,
        }));

    } else {

        throw new NotHavePermissions();

    }
}));

/**
 * Calificar petición receptor
 */
router.post('/:id/receptor', asyncHandler(async (req, res, next) => {
    const { id } = req.params
    

    // obtener usuario del token
    const usuario_id = req.body.jwt_usuario_id;
    
    // Verificar permisos
    const peticion = await getPeticion(id);

    if(String(usuario_id) === String(peticion.usuario_id)) {

        res.json( await updatePeticion(id, {
            es_recibida: req.body.es_recibida,
            calificacion_receptor: req.body.calificacion_receptor,
        }));

    } else {

        throw new NotHavePermissions();
        
    }
}));

module.exports = router;