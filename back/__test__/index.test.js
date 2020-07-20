const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const crypto = require('crypto')
const { usuariosOK, usuariosERROR } = require('../__mocks__/user.mocks')

describe('Endpoints Usuario', () => {
  beforeAll(async (done) => {
    setTimeout(() => {
      done()
    }, 2000)
  })

  test.each(usuariosOK)('Registro Usuario OK - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.post('/registro').send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(201)
  }, 30000)

  test.each(usuariosERROR)('Registro Usuario con Error - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.post('/registro').send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(200)
  }, 30000)

  /*

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
