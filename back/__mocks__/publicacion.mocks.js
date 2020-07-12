const crearPublicacionOK = [
  {
    descripcion: 'Crear un publicacion',
    code_result: 'publicacion-creada',
    obj_publicacion: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  }
]

const crearPublicacionError = [
  {
    descripcion: 'Error en el nombre',
    code_result: 'publicacion-no_guardado',
    obj_publicacion: {
      nombre: '',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el correo',
    code_result: 'publicacion-no_guardado',
    obj_publicacion: {
      nombre: 'Lucas',
      correo: 123,
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el titulo y mensaje',
    code_result: 'publicacion-no_guardado',
    obj_publicacion: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: undefined,
      mensaje: null
    }
  }
]
module.exports = {
  crearPublicacionOK,
  crearPublicacionError
}
