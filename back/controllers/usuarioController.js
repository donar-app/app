'use strict'

const { generaStringRandom } = require('../utils/myUtils')
const UsuarioRepository = require('../repository/usuarioRepository')
const { responseJSON } = require('../utils/responseJSON')
const asyncHandler = require('../middlewares/async-handler')
const { crearToken, setTokenEnCabecera } = require('../middlewares/seguridad')
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)
require('../middlewares/oauth')

const crearUsuario = asyncHandler(async (req, res, next) => {
  const { obj_usuario: objUsuario } = req.body

  if (!objUsuario) {
    return res.json(responseJSON(true, 'registro_error', 'Falta el objeto usuario', ['obj_usuario']))
  }

  if (!Object.prototype.hasOwnProperty.call(objUsuario, 'alias')) {
    return res.json(responseJSON(false, 'falta_alias', 'Falta el parametro alias', []))
  }

  const clave = process.env.NODE_ENV === 'PROD' ? generaStringRandom(8) : objUsuario.alias
  objUsuario.clave = await bcrypt.hashSync(clave, SALT)
  objUsuario.es_activo = true
  objUsuario.creado_en = new Date(
    new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }))

  try {
    const usuario = await UsuarioRepository.guardar(objUsuario)
    usuario.clave = undefined
    return res.json(responseJSON(true, 'usuario_registrado', 'Usuario registrado con exito!', usuario))
  } catch (error) {
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'alias')) {
      return res.json(responseJSON(false, 'valor_duplicado', 'El alias ya esta registro por otro usuario.', error.keyValue))
    }
    if (Object.prototype.hasOwnProperty.call(error.keyValue, 'correo')) {
      // Aca le enviaremos un mail al usuario.
    }
    return res.json(responseJSON(false, 'error_interno', 'No pudimos registrarlo.', []))
  }
})

const obtenerUsuario = asyncHandler(async (req, res) => {
  const { jwt_usuario_id: id } = req.body
  const usuario = await UsuarioRepository.obtenerPorID(id)
  if (!usuario) {
    return responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado!', [])
  }
  return responseJSON(true, 'usuario_encontrado', 'Usuario encontrado!', usuario)
})

const loginConAlias = asyncHandler(async (req, res, next) => {
  const { credencial_alias: alias, credencial_clave: clave } = req.body

  const usuario = await UsuarioRepository.obtenerPorAlias(alias)

  if (!usuario || !usuario.clave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave)

  if (!validaClave) {
    return res.json(responseJSON(false, 'usuario_no_encontrado', 'Usuario no encontrado', []))
  }

  usuario.clave = undefined
  const token = await crearToken({ id: usuario.id, alias: usuario.alias })
  await setTokenEnCabecera(res, token)

  return res.json(responseJSON(true, 'usuario_logeado', 'Usuario logeado con exito!', usuario))
})

const actualizarUsuario = asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario, jwt_usuario_id: usuarioID } = req.body
  if (!objUsuario) {
    return responseJSON(false, 'usuario_faltante', 'Falta el objeto usuario', ['obj_usuario'])
  }

  if (objUsuario.clave) {
    objUsuario.clave = await bcrypt.hashSync(objUsuario.clave, SALT)
  }
  const usuario = UsuarioRepository.actualizar(usuarioID, {
    ...objUsuario,
    actualizado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  })

  if (!usuario) {
    return res.json(responseJSON(false, 'usuario-error_editar', 'Usuario no puedo ser modificado.', []))
  }
  usuario.clave = undefined

  return res.json(responseJSON(true, 'usuario_editado', 'Usuario fue modificado con exito!', usuario))
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
  obtenerUsuario,
  loginConAlias,
  actualizarUsuario,
  eliminarUsuario,
  loginGoogle
}
