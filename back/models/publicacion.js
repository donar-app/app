const mongoose = require('mongoose')
let Schema = mongoose.Schema

let publicacionSchema = new Schema({

    anunciante_id: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    tipo: String,
    titulo: String,
    categoria: String,
    creada_en: Date,
    actualizada_en: Date,
    imagenRoute: String,
    estado: Number
})


module.exports = mongoose.model('Publicacion', publicacionSchema)