'use strict';

const Usuario = require('../models/usuarioModel')

const crearUsuario = async (usuarioObject) => {
    let newUsuario = new Usuario(usuarioObject );
    return await newUsuario.save();
}

const obtenerUsuario = async (id) => {
    return await Usuario.findById(id)
}

const obtenerUsuarioPorAlias = async (alias) => {
    return await Usuario.findOne({alias : alias})
}

const actualizarUsuario = async (id, usuarioObject) => {
    return await Usuario.findOneAndUpdate(
        {_id: id}, 
        usuarioObject, 
        { 
            new: true, 
            runValidators: true, 
            context: 'query'
        }
    );
}

const eliminarUsuario = async (id, usuarioObject) => {
    return await usuarioObject.findOneAndUpdate(
        {_id: id}, 
        usuarioObject, 
        { 
            new: true, 
            runValidators: true, 
            context: 'query'
        }
    );
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarioPorAlias,
    actualizarUsuario,
    eliminarUsuario
}