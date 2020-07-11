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
    return res.json(responseJSON(true, 'registro-falta_objeto', 'Falta el objeto usuario', ['obj_usuario']))
  }

  if (!Object.prototype.hasOwnProperty.call(objUsuario, 'alias') || !Object.prototype.hasOwnProperty.call(objUsuario, 'clave')) {
    return res.json(responseJSON(false, 'registro-faltan_parametros', 'Faltan algunos parametros', ['alias', 'clave']))
  }
  const resultadoSeguridad = seguridadDeClave(objUsuario.clave)

  if (!resultadoSeguridad) {
    return res.json(responseJSON(false, 'registro-clave_insegura', 'Su clave es insegura', []))
  }
  objUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  objUsuario.es_activo = false
  objUsuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const { error, codigo, objeto: usuario } = await UsuarioRepository.crear(objUsuario)
  if (error) {
    if (codigo === 'correo-duplicado') {
      return res.status(201).json(responseJSON(true, 'registro-ok', 'Usuario registrado con exito!', []))
    }
    return res.status(200).json(responseJSON(false, 'registro-error_en_propiedades', error, []))
  }
  // const encrypted = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`${usuario.id}${usuario.correo}`).digest('hex')
  // await confirmacionDeRegistro(usuario.correo, encrypted)
  return res.status(201).json(responseJSON(true, 'registro-ok', 'Usuario registrado con exito!', []))
})

const confirmarRegistro = asyncHandler(async (req, res) => {
  const { encrypted, correo } = req.body
  if (!encrypted || !correo) {
    return res.json(responseJSON(false, 'usuario-faltan_parametros', 'Faltan parametros', ['encrypted', 'correo']))
  }

  const { objeto: usuario } = await UsuarioRepository.leerUnoPorParametros({ correo: correo, es_activo: false })

  if (!usuario) {
    return res.json(responseJSON(false, 'usuario-encrypted_erroneo', 'Datos Erroneos.', []))
  }
  const encryptedServidor = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`${usuario.id}${usuario.correo}`).digest('hex')

  if (encryptedServidor !== encrypted) {
    return res.json(responseJSON(false, 'usuario-encrypted_erroneo', 'Datos Erroneos..', []))
  }

  const { error, objeto: usuarioActualizado } = await UsuarioRepository.actualizarPorID(usuario.id, { es_activo: true })

  if (error) {
    return res.json(responseJSON(false, 'usuario-error_al_actualizar', error, []))
  }
  usuarioActualizado.clave = undefined
  return res.json(responseJSON(true, 'usuario-registro_confirmado', 'Cuenta Confirmada', usuarioActualizado))
})

const login = asyncHandler(async (req, res) => {
  const { credencial_correo: correo, credencial_clave: clave } = req.body

  const { objeto: usuario } = await UsuarioRepository.leerUnoPorParametros({ correo: correo })

  if (!usuario || !usuario.clave) {
    return res.json(responseJSON(false, 'login-error_credenciales', 'Usuario o contraseña incorrecta', []))
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave)

  if (!validaClave) {
    return res.json(responseJSON(false, 'login-error_credenciales', 'Usuario o contraseña incorrecta', []))
  }

  if (usuario.es_activo === false) {
    /// /////////////////////////////////////
    /// ///////ACA DEBEOS ENVIAR EL MAIL NUEVAMENTE PARA QUE CONFIRME LEL EMAIL Y COMPLETAR EL REGISTRO.
    /// /////////////////////////////////////
    return res.json(responseJSON(false, 'login-cuenta_no_confirmada', 'Cuenta sin confirmar, revise un correo electronico', []))
  }

  usuario.clave = undefined
  const token = await crearToken({ id: usuario.id, alias: usuario.alias, ciudad: usuario.ciudad, pais: usuario.pais })
  await setTokenEnCabecera(res, token)

  return res.json(responseJSON(true, 'login-ok', 'Usuario logeado con exito!', usuario))
})

const recuperarClave = asyncHandler(async (req, res) => {
  const { correo } = req.body

  if (!correo) {
    return res.json(responseJSON(false, 'usuario-correo_faltante', 'Falta el correo', ['correo']))
  }
  const { objeto: usuario } = await UsuarioRepository.leerUnoPorParametros({ correo: correo, es_activo: true })

  if (!usuario) {
    return res.json(responseJSON(true, 'usuario-recuperar_clave', 'Si esta registrado, le llegara un mail para recupara su contraseña.', []))
  }

  const nuevaClave = generaStringRandom(8)
  usuario.clave = await bcrypt.hashSync(nuevaClave, SALT)
  usuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  const { objeto: usuarioActualizado } = await UsuarioRepository.actualizarPorID(usuario.id, usuario)

  if (!usuarioActualizado) {
    return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
  }

  const resultadoEnvioCorreo = await enviaNuevaClave(correo, nuevaClave)

  if (!resultadoEnvioCorreo) {
    return res.json(responseJSON(false, 'usuario-recuperarClave', 'Si esta registrado, le llegara un mail.', []))
  }

  return res.json(responseJSON(true, 'usuario-recuperar_clave', 'Si esta registrado, le llegara un mail para recupara su contraseña.', []))
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
  login,
  recuperarClave,
  loginGoogle
}
