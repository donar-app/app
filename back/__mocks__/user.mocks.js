const usuariosRegistroOK = [
  {
    descripcion: 'Registro correcto',
    code_result: 'registro-ok',
    obj_usuario: {
      nombre: 'Lucas',
      apellido: 'Biglia',
      alias: 'lbi',
      clave: 'lucas...123',
      correo: 'lucas@hotmail.com',
      pais: 'ar',
      ciudad: 'mendoza'
    }
  },
  {
    descripcion: 'Registro Correcto',
    code_result: 'registro-ok',
    obj_usuario: {
      nombre: 'Pablo',
      apellido: 'Guerrero',
      alias: 'pgue',
      clave: 'pablo...123',
      correo: 'pablo@hotmail.com',
      pais: 'pe',
      ciudad: 'lima'
    }
  },
  {
    descripcion: 'Indicara registro correcto, pero en realidad ya el usuario esta registrado, pero no dara esa informacion, sino que enviara un mail',
    code_result: 'registro-ok',
    obj_usuario: {
      nombre: 'Pablo',
      apellido: 'Guerrero',
      alias: 'pgueOtra',
      clave: 'pablo...123',
      correo: 'pablo@hotmail.com',
      pais: 'pe',
      ciudad: 'lima'
    }
  }
]

const usuariosRegistroError = [
  {
    descripcion: 'EL nombre no puede estar vacio',
    code_result: 'registro-error_en_propiedades',
    obj_usuario: {
      nombre: '',
      apellido: 'Costa',
      alias: 'dco',
      clave: 'douglas...123',
      correo: 'lucas@hotmail.com',
      pais: 'br',
      ciudad: 'santos'
    }
  },
  {
    descripcion: 'EL apellido no puede estar vacio',
    code_result: 'registro-error_en_propiedades',
    obj_usuario: {
      nombre: 'James',
      apellido: '',
      alias: 'jro',
      clave: 'james...123',
      correo: 'james@hotmail.com',
      pais: 'co',
      ciudad: 'bogota'
    }
  },
  {
    descripcion: 'EL alias no puede estar vacio',
    code_result: 'registro-error_en_propiedades',
    obj_usuario: {
      nombre: 'Marcelo',
      apellido: 'Moreno',
      alias: '',
      clave: 'marcelo...123',
      correo: 'marcelo@hotmail.com',
      pais: 'bo',
      ciudad: 'la paz'
    }
  },
  {
    descripcion: 'La contraseña es insegura, no cumple con los requerimientos',
    code_result: 'registro-clave_insegura',
    obj_usuario: {
      nombre: 'Alexis',
      apellido: 'Sanchez',
      alias: 'asa',
      clave: 'alexis',
      correo: 'alexis@hotmail.com',
      pais: 'cl',
      ciudad: 'santiago'
    }
  }
]

const usuariosModificarOK = [
  {
    code_result: 'usuario-editado',
    obj_usuario: {
      nombre: 'Ever',
      apellido: 'Banega',
      alias: 'ever',
      clave: 'ever...123',
      correo: 'ever@hotmail.com',
      pais: 'ar',
      ciudad: 'salta'
    }
  }
]

const usuariosModificarError = [
  {
    code_result: 'usuario-clave_insegura',
    obj_usuario: {
      nombre: 'Ever',
      apellido: 'Banega',
      alias: 'ever',
      clave: 'ever',
      correo: 'ever@hotmail.com',
      pais: 'ar',
      ciudad: 'salta'
    }
  },
  {
    code_result: 'usuario-error_propiedad',
    obj_usuario: {
      nombre: 'E',
      apellido: 'Banega',
      alias: 'ever',
      clave: 'ever...123',
      correo: 'pablo@hotmail.com',
      pais: 'ar',
      ciudad: 'salta'
    }
  },
  {
    code_result: 'usuario-error_propiedad',
    obj_usuario: {
      nombre: 'Ever',
      apellido: 'B',
      alias: 'ever',
      clave: 'ever...123',
      correo: 'pa',
      pais: 'ar',
      ciudad: 'salta'
    }
  }
]

module.exports = {
  usuariosRegistroOK,
  usuariosRegistroError,
  usuariosModificarOK,
  usuariosModificarError
}
