const express = require('express')

const router = express.Router()
const asyncHandler = require('../middlewares/async-handler')
const { crearToken, setTokenEnCabecera, verificaCredenciales } = require('../middlewares/seguridad')
const { crearUsuario, loginMedianteAlias } = require('../controllers/usuarioController')
const { responseJSON } = require('../utils/responseJSON')
const passport = require('passport')
require('../middlewares/oauth')

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ mensaje: 'bienvenidos', estado: 'ok' })
})

/**
 * Login de Usuario
 * @param {string} alias alias del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token en la cabecera
 */
router.post('/ingreso', verificaCredenciales, asyncHandler(async (req, res) => {
  const { credencial_alias: alias, credencial_clave: clave } = req.body

  const resultado = await loginMedianteAlias(alias, clave)

  if (resultado.tipo !== 'correcto') {
    return res.json(resultado)
  }
  const token = await crearToken({ id: resultado.cuerpo.id, alias: resultado.cuerpo.alias })
  await setTokenEnCabecera(res, token)
  return res.json(resultado)
}))

/**
 * Registro de Usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.post('/registro', asyncHandler(async (req, res) => {
  const { obj_usuario: objUsuario } = req.body
  if (!objUsuario) {
    return res.status(200).json(responseJSON(true, 'registro_error', 'Falta el objeto usuario', ['obj_usuario']))
  }

  const resultado = await crearUsuario(objUsuario)
  return res.json(resultado)
}))

/*

router.get('/loginGoogle', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

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

*/

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

module.exports = router
