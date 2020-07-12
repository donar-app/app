const contactoOK = [
  {
    descripcion: 'Crear un contacto',
    code_result: 'contacto-registrado',
    obj_contacto: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  }
]

const contactoError = [
  {
    descripcion: 'Error en el nombre',
    code_result: 'contacto-no_guardado',
    obj_contacto: {
      nombre: '',
      correo: 'lucas@hotmail.com',
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el correo',
    code_result: 'contacto-no_guardado',
    obj_contacto: {
      nombre: 'Lucas',
      correo: 123,
      titulo: 'Funciona todo genial',
      mensaje: 'Este perfecto todo'
    }
  },
  {
    descripcion: 'Error en el titulo y mensaje',
    code_result: 'contacto-no_guardado',
    obj_contacto: {
      nombre: 'Lucas',
      correo: 'lucas@hotmail.com',
      titulo: undefined,
      mensaje: null
    }
  }
]
module.exports = {
  contactoOK,
  contactoError
}