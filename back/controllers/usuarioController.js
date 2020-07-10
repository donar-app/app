'use strict'

const UsuarioRepository = require('../repository/usuarioRepository')
const { responseJSON } = require('../utils/responseJSON')
const { seguridadDeClave, generaStringRandom } = require('../utils/myUtils')
const { enviaNuevaClave, confirmacionDeRegistro } = require('../utils/mail')
const asyncHandler = require('../middlewares/async-handler')
const { crearToken, setTokenEnCabecera } = require('../middlewares/seguridad')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const SALT = bcrypt.genSaltSync(10)

const crearUsuario = asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario } = req.body

  if (!objUsuario) {
    return res.json(responseJSON(true, 'registro_error', 'Falta el objeto usuario', ['obj_usuario']))
  }

  if (!Object.prototype.hasOwnProperty.call(objUsuario, 'alias') || !Object.prototype.hasOwnProperty.call(objUsuario, 'clave')) {
    return res.json(responseJSON(false, 'faltan_parametros', 'Faltan algunos parametros', ['alias', 'clave']))
  }
  const resultadoSeguridad = seguridadDeClave(objUsuario.clave)

  if (!resultadoSeguridad) {
    return res.json(responseJSON(false, 'error_interno', 'Su clave es insegura', []))
  }
  objUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  objUsuario.es_activo = false
  objUsuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  try {
    const usuario = await UsuarioRepository.guardar(objUsuario)
    const encrypted = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`${usuario.id}${usuario.correo}`).digest('hex')
    await confirmacionDeRegistro(usuario.correo, encrypted)
    return res.status(201).json(responseJSON(true, 'usuario-registrado', 'Usuario registrado con exito!', []))
  } catch (error) {
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'alias')) {
      return res.json(responseJSON(false, 'valor_duplicado', 'El alias ya esta registro por otro usuario.', error.keyValue))
    }
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'correo')) {
      return res.status(201).json(responseJSON(true, 'usuario-registrado', 'Usuario registrado con exito!', []))
    }
    return res.json(responseJSON(false, 'error_interno', 'No pudimos registrarlo.', []))
  }
})

const confirmarRegistro = asyncHandler(async (req, res) => {
  const { encrypted, correo } = req.body
  if (!encrypted || !correo) {
    return res.json(responseJSON(false, 'usuario-faltan_parametros', 'Faltan parametros', ['encrypted', 'correo']))
  }

  const usuario = await UsuarioRepository.obtenerUnoPorParametros({ correo: correo, es_activo: false })

  if (!usuario) {
    return res.json(responseJSON(false, 'usuario-encrypted_erroneo', 'Datos Erroneos', []))
  }
  const encryptedServidor = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`${usuario.id}${usuario.correo}`).digest('hex')

  if (encryptedServidor !== encrypted) {
    return res.json(responseJSON(false, 'usuario-encrypted_erroneo', 'Datos Erroneos', []))
  }

  const resultado = await UsuarioRepository.actualizar(usuario.id, { es_activo: true })

  if (!resultado) {
    return res.json(responseJSON(false, 'usuario-error_interno', 'Error Interno', []))
  }
  return res.json(responseJSON(false, 'usuario-registro_confirmado', 'Cuenta Confirmada', []))
})

const obtenerUsuario = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id } = req.body
  const usuario = await UsuarioRepository.obtenerPorID(id)
  if (!usuario) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado!', [])
  }
  return responseJSON(true, 'usuario_encontrado', 'Usuario encontrado!', usuario)
})

const login = asyncHandler(async (req, res) => {
  const { credencial_correo: correo, credencial_clave: clave } = req.body

  const usuario = await UsuarioRepository.obtenerUnoPorParametros({ correo: correo })

  if (!usuario || !usuario.clave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave)

  if (!validaClave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }

  if (usuario.es_activo === false) {
    /// /////////////////////////////////////
    /// ///////ACA DEBEOS ENVIAR EL MAIL NUEVAMENTE PARA QUE CONFIRME LEL EMAIL Y COMPLETAR EL REGISTRO.
    /// /////////////////////////////////////
    return res.json(responseJSON(false, 'usuario-cuenta_no_confirmada', 'Cuenta sin confirmar, revise un correo electronico', []))
  }

  usuario.clave = undefined
  const token = await crearToken({ id: usuario.id, alias: usuario.alias, ciudad: usuario.ciudad, pais: usuario.pais })
  await setTokenEnCabecera(res, token)

  return res.json(responseJSON(true, 'usuario-logeado', 'Usuario logeado con exito!', usuario))
})

const actualizarUsuario = asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario, jwt_usuario_id: usuarioID } = req.body
  if (!objUsuario) {
    return responseJSON(false, 'usuario_faltante', 'Falta el objeto usuario', ['obj_usuario'])
  }

  if (objUsuario.clave) {
    const resultadoSeguridad = seguridadDeClave(objUsuario.clave)

    if (!resultadoSeguridad) {
      return res.json(responseJSON(false, 'error_interno', 'Su clave es insegura', []))
    }
    objUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  }

  objUsuario.actualizado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  try {
    const usuario = await UsuarioRepository.actualizar(usuarioID, objUsuario)

    if (!usuario) {
      return res.json(responseJSON(false, 'usuario-error_editar', 'No se pudo modificar.', []))
    }
    usuario.clave = undefined

    return res.json(responseJSON(true, 'usuario_editado', 'Usuario fue modificado con exito!', usuario))
  } catch (error) {
    console.log('error.message :>> ', error.message)
    return res.json(responseJSON(true, 'usuario-error_interno', 'No se puedo modificar', []))
  }
})

const recuperarClave = asyncHandler(async (req, res) => {
  const { correo } = req.body

  if (!correo) {
    return res.json(responseJSON(false, 'usuario-correo_faltante', 'Falta el correo', ['correo']))
  }
  const usuario = await UsuarioRepository.obtenerUnoPorParametros({ correo: correo, es_activo: true })

  if (!usuario) {
    return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
  }

  const nuevaClave = generaStringRandom(8)
  usuario.clave = await bcrypt.hashSync(nuevaClave, SALT)
  usuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const resultado = await UsuarioRepository.actualizar(usuario.id, usuario)

  if (!resultado) {
    return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
  }

  const resultadoEnvioCorreo = await enviaNuevaClave(correo)

  if (!resultadoEnvioCorreo) {
    return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
  }

  return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
})

const eliminarUsuario = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id } = req.body
  const usuario = await UsuarioRepository.eliminar(id)

  if (!usuario) {
    return res.json(responseJSON(true, 'usuario_no_eliminado', 'Usuario no encontrado', []))
  }

  return res.json(responseJSON(true, 'usuario_eliminado', 'Usuario Eliminado', usuario))
})

const loginGoogle = async (objUsuario) => {
  /*
  router.get('/loginGoogle', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }))

router.get('/loginGoogle/callback', passport.authenticate('google', { failureRedirect: 'https://donar-front.herokuapp.com/#/iniciarSesion' }),
  (req, res)=> {
    console.log(req);
    return responseJSON(true,"login_correcto","Logeado con Google",[])
});

router.get('/loginGoogle', asyncHandler(async (req, res) => {

  passport.use(new GoogleStrategy({
    consumerKey: "226196706149-ftdlhd36nlatgn0kc9abupdjcbiu0o0f.apps.googleusercontent.com",
    consumerSecret: "t2U9F8SDeGlyXN0WNphN0ddn",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(token);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

}));

router.get('/google-oauth/callback', verificaCredenciales, asyncHandler(async (req, res) => {

  console.log("adsa");
  passport.use(new GoogleStrategy({
    consumerKey: "226196706149-ftdlhd36nlatgn0kc9abupdjcbiu0o0f.apps.googleusercontent.com",
    consumerSecret: "t2U9F8SDeGlyXN0WNphN0ddn",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
  ));

}));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }), (req, res) => {
  console.log('asdadsasd')
})

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'https://donar-front.herokuapp.com/#/iniciarSesion' }),
  function (req, res) {
    res.redirect('/')
  })

  */
}

module.exports = {
  crearUsuario,
  confirmarRegistro,
  obtenerUsuario,
  login,
  actualizarUsuario,
  recuperarClave,
  eliminarUsuario,
  loginGoogle
}
