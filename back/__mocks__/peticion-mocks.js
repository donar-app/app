const crearPeticionOK = [
  {
    descripcion: 'Crear un peticion',
    code_result: 'peticion-ok',
    obj_peticion: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  }
]

const crearPeticionError = [
  {
    descripcion: 'Error en el nombre',
    code_result: 'peticion-no_guardado',
    obj_peticion: {
      nombre: '',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el correo',
    code_result: 'peticion-no_guardado',
    obj_peticion: {
      nombre: 'Lucas',
      correo: 123,
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el titulo y mensaje',
    code_result: 'peticion-no_guardado',
    obj_peticion: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: undefined,
      mensaje: null
    }
  }
]
module.exports = {
  crearPeticionOK,
  crearPeticionError
}
