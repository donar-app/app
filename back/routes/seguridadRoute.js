const express = require('express');

const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');
const {crearToken,setTokenEnCabecera,verificaCredenciales} = require('../middlewares/seguridad');
const {generaStringRandom} = require("../utils/myUtils")
const { crearUsuario,obtenerUsuario,obtenerUsuarioPorAlias } = require('../controllers/usuarioController');
const {responseJSON} = require('../utils/responseJSON');
const bcrypt = require('bcryptjs');
const SALT = bcrypt.genSaltSync(10);
const passport = require('passport');
require("../utils/oauth")

/**
 * Login de Usuario
 * @param {string} alias alias del usuario
 * @param {string} clave clave del usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 * @returns {String} Se retorna el token en la cabecera
 */
router.post('/login', verificaCredenciales, asyncHandler(async (req, res) => {
  
  const { credencial_alias : alias,credencial_clave : clave } = req.body;

  const usuario = await obtenerUsuarioPorAlias(alias)

  if (!usuario || !usuario.clave) {
    return res.json(responseJSON(false,"usuario_no_encontrado","Usuario no encontrado",[]));
  }
  const validaClave = await bcrypt.compareSync(clave, usuario.clave);

  if (!validaClave) {
    return res.json(responseJSON(false,"usuario_no_encontrado","Usuario no encontrado",[]));
  }

  const token = await crearToken({ id: usuario.id, alias: usuario.alias });
  await setTokenEnCabecera(res, token);
  
  usuario.clave = undefined

  return res.json(responseJSON(true,"usuario_logeado","Usuario logeado con exito!",usuario));
}));


/**
 * Registro de Usuario
 * @returns {JSON} Se retorna todo el objeto usuario, pero sin contraseña
 */
router.post('/registro', asyncHandler(async (req, res) => {

  //const clave = generaStringRandom(8);

  if (!req.body.alias) {
    return res.json(responseJSON(true,"falta_alias","Falta el parametro alias",[]));
  }
  const clave = await bcrypt.hashSync(req.body.alias, SALT);
  const bufferUsuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    alias: req.body.alias,
    email: req.body.email,
    clave : clave,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    es_activo: true,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  };  

  try {
    const resultUsuario = await crearUsuario(bufferUsuario)
    resultUsuario.clave = undefined
    return res.status(201).json(responseJSON(true,"usuario_registrado","Usuario registrado con exito!",resultUsuario));
  } catch (error) {
    return res.json(responseJSON(false,"valor_duplicado","Uno de los valores ya existe en nuestra db.",error.keyValue));
  }

}));

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

module.exports = router;