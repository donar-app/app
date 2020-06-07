const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { loginGoogle } = require('../controllers/usuarioController')

passport.use(new GoogleStrategy({
  clientID: 'asd',
  clientSecret: '234',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
async function (accessToken, refreshToken, profile, done) {
  const bufferUsuario = {
    googleId: profile.id,
    nombre: profile.name.givenName,
    apellido: profile.name.familyName,
    alias: profile.displayName,
    ciudad: 'buffer',
    email: 'asdsfdsd',
    pais: 'buff',
    clave: 'buffer',
    es_activo: true,
    creado_en: new Date(
      new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    )
  }
  const usuario = await loginGoogle(bufferUsuario)
  done()
}
))
