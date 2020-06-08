const PublicacionModel = require('../models/publicacionModel')
const DefaultRepository = require('../repository/defaultRepositoy')
class PublicacionRepository extends DefaultRepository {
  async obtenerPublicacionesActivas (id) {
    return await this.model.find({ estado: 'Publicado' })
      .populate({
        path: 'preguntas',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'peticiones',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'anunciante',
        select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
      })
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
      .populate({
        path: 'preguntas',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'peticiones',
        populate: {
          path: 'usuario',
          select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
        }
      })
      .populate({
        path: 'anunciante',
        select: ['_id', 'nombre', 'apellido', 'correo', 'pais', 'ciudad', 'es_activo', 'creado_en']
      })
  }

  async actualizar (id, object) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      object,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

module.exports = new PublicacionRepository(PublicacionModel)
