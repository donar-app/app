const usuariosOK = [
  {
    code_result: 'usuario-registrado',
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
    code_result: 'usuario-registrado',
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
    code_result: 'usuario-registrado',
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

const usuariosERROR = [
  {
    code_result: 'usuario-registrado',
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
    code_result: 'usuario-registrado',
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
    code_result: 'usuario-registrado',
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
    code_result: 'usuario-registrado',
    obj_usuario: {
      nombre: 'Alexis',
      apellido: 'Sanchez',
      alias: 'asa',
      clave: 'alexis',
      correo: 'alexis@hotmail.com',
      pais: 'cl',
      ciudad: 'santiago'
    }
  },
  {
    code_result: 'usuario-registrado',
    obj_usuario: {
      nombre: 'Douglas',
      apellido: 'Costa',
      alias: 'dco',
      clave: 'douglas...123',
      correo: 'lucas@hotmail.com',
      pais: 'br',
      ciudad: 'brasil'
    }
  }
]

module.exports = {
  usuariosOK,
  usuariosERROR
}
