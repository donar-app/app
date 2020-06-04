'use strit'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const { getPeticion, createPeticion, updatePeticion, getPeticiones } = require('../controllers/peticion');
const { NotHavePermissions } = require('../errors');
const { getPublication } = require('../controllers/publicacion');
const { obtenerUsuario } = require('../controllers/usuarioController');

/**
 * Obtener peticiones de una Publicacion
 */
router.get('/:id', asyncHandler(async (req, res, next) => {
    const data = await getPeticiones(req.params.id);
    res.json({ data })
}))

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
    let peticion = await getPeticion(id);
    const publicacion = await getPublication(peticion.publicacion_id);

    let emisorObj = await obtenerUsuario(publicacion.anunciante_id);
    let receptorObj = await obtenerUsuario(peticion.usuario_id);

    emisorObj = {
        nombre: emisorObj.nombre,
        apellido: emisorObj.apellido,
        alias: emisorObj.alias,
        email: emisorObj.email,
        pais: emisorObj.pais,
        ciudad: emisorObj.ciudad
    };

    receptorObj = {
        nombre: receptorObj.nombre,
        apellido: receptorObj.apellido,
        alias: receptorObj.alias,
        email: receptorObj.email,
        pais: receptorObj.pais,
        ciudad: receptorObj.ciudad
    };

    if(String(publicacion.anunciante_id) === String(usuario_id)){
        peticion =  await updatePeticion(id, {
            es_aceptada: req.body.es_aceptada
        });

        res.json({
            peticion,
            emisorObj,
            receptorObj
        });

    } else {

        throw new NotHavePermissions();

    }
}));

module.exports = router;