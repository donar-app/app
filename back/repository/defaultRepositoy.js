class DefaultRepository {
  constructor (model) {
    this.model = model
  }

  async guardar (object) {
    return await this.model.create(object)
  }

  async obtenerPorID (id) {
    return await this.model.findById(id)
  }

  async obtenerTodos () {
    return await this.model.find()
  }

  async actualizarPorID (id, object) {
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

  async eliminarPorID (id) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { elimnado: true }
    )
  }
}

module.exports = DefaultRepository
