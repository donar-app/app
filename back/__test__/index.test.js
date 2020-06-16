const request = require('supertest')
const app = require('../app')
const crypto = require('crypto')
const usuario = {
  obj_usuario: {
    nombre: 'abbul',
    apellido: 'rodriguez',
    alias: 'aroz',
    clave: 'asdasdsadasda.123',
    correo: 'abbul@hotmail.com',
    pais: 'ar',
    ciudad: 'cordoba'
  }
}

describe('Index Route', () => {
  test('Inicio de la APP - / ', done => {
    request(app)
      .get('/')
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('bienvenido')
        done()
      })
  })

  test('Registro de Usuario - /registro', done => {
    request(app)
      .post('/registro')
      .send(usuario)
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('usuario-registrado')
        done()
      })
  })

  test('Confirmacion de Registro - /confirmar-registro', done => {
    const encrypted = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`5ee57d53217b5412f4e03ba6${usuario.obj_usuario.correo}`).digest('hex')
    request(app)
      .put('/confirmar-registro')
      .send({
        encrypted: encrypted,
        correo: usuario.obj_usuario.correo
      })
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('usuario-registro_confirmado')
        done()
      })
  })

  /*
  test('Ingreso de Usuario - /ingreso', done => {
    request(app)
      .post('/ingreso')
      .set('Authorization', Buffer.from(`${usuario.alias}:${usuario.clave}`).toString('base64'))
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('usuario-logeado')
        done()
      })
  })

  test('Recuperacion de Clave - /recuperar-clave', done => {
    request(app)
      .get('/recuperar-clave')
      .then(resAPP => {
        expect(resAPP.body.codigo).toEqual('usuario-clave_recuperada')
        done()
      })
  })
  */
})
