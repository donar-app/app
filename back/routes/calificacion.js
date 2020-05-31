'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { getPeticion, createPeticion, updatePeticion } = require('../controllers/peticion');
const { NotHavePermissions } = require('./../errors');
const { getPublication } = require('../controllers/publicacion');
const { obtenerUsuario } = require('../controllers/usuarioController');
/**
 * Calificar petición emisor
 */
router.post('/:id/emisor', asyncHandler(async (req, res, next) => {
    const { id } = req.params

    // obtener usuario del token
    const usuario_id = req.body.jwt_usuario_id;
    
    // Verificar permisos
    let peticion = await getPeticion(id);
    const publicacion = await getPublication(peticion.publicacion_id);
    const usuario = await obtenerUsuario(publicacion.anunciante_id);
    
    if(String(usuario_id) === String(publicacion.anunciante_id)) {
        peticion = await updatePeticion(id, {
            es_entregada: req.body.es_entregada,
            calificacion_emisor: req.body.calificacion_emisor,
        });
        return res.json({peticion});

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
    let peticion = await getPeticion(id);
    const publicacion = await getPublication(peticion.publicacion_id);
    const usuario = await obtenerUsuario(publicacion.anunciante_id);

    if(String(usuario_id) === String(peticion.usuario_id)) {
        peticion = await updatePeticion(id, {
            es_recibida: req.body.es_recibida,
            calificacion_receptor: req.body.calificacion_receptor,
        });
        res.json({peticion});

    } else {

        throw new NotHavePermissions();
        
    }
}));

module.exports = router;