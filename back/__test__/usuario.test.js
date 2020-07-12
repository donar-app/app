const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const crypto = require('crypto')
const { encodeBasic } = require('../utils/myUtils')
const usuarioModel = require('../models/usuarioModel')
const { usuariosRegistroOK, usuariosRegistroError, usuariosModificarOK, usuariosModificarError } = require('../__mocks__/user.mocks')
let token = null
let usuarioID = null

describe('Endpoints Usuario y Seguridad', () => {
  beforeAll(async (done) => {
    setTimeout(async () => {
      await usuarioModel.deleteMany({})
      done()
    }, 2000)
  })

  test.each(usuariosRegistroOK)('Registro Usuario - OK - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.post('/registro').send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(201)
  }, 30000)

  test.each(usuariosRegistroError)('Registro Usuario - Error - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.post('/registro').send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(200)
  }, 30000)

  test('Login Usuario - Cuenta no confirmada', async (done) => {
    const usuario = usuariosRegistroOK[0]
    const resultAPI = await request.post('/ingreso').set('Authorization', encodeBasic(usuario.obj_usuario.correo, usuario.obj_usuario.clave))
    expect(resultAPI.body.codigo).toEqual('login-cuenta_no_confirmada')
    expect(resultAPI.statusCode).toEqual(200)
    done()
  })

  test('Login Usuario - Confirmada', async (done) => {
    await usuarioModel.findOneAndUpdate({ ...usuariosRegistroOK[0], es_activo: true })
    const usuario = usuariosRegistroOK[0]
    const resultAPI = await request.post('/ingreso').set('Authorization', encodeBasic(usuario.obj_usuario.correo, usuario.obj_usuario.clave))
    token = resultAPI.res.headers.authorization
    usuarioID = resultAPI.body.cuerpo.id
    expect(resultAPI.body.codigo).toEqual('login-ok')
    expect(resultAPI.statusCode).toEqual(200)
    done()
  })

  test('Confirmacion de Registro - OK', async (done) => {
    await usuarioModel.findByIdAndUpdate(usuarioID, { es_activo: false })
    const usuario = usuariosRegistroOK[0]
    const encrypted = crypto.createHmac('sha256', process.env.SECRET_CRYPTO_REGISTER).update(`${usuarioID}${usuario.obj_usuario.correo}`).digest('hex')
    const resultAPI = await request.put('/confirmar-registro').send({ encrypted: encrypted, correo: usuario.obj_usuario.correo })
    expect(resultAPI.body.codigo).toEqual('usuario-registro_confirmado')
    expect(resultAPI.statusCode).toEqual(200)
    done()
  })

  test.each(usuariosModificarOK)('Modificar Usuarios - OK - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.put('/usuarios').set('Authorization', `Bearer ${token}`).send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(200)
  }, 30000)

  test.each(usuariosModificarError)('Modificar Usuarios - ERROR - %#', async (usuario) => {
    const { obj_usuario: objUsuario, code_result: codeResult } = usuario
    const resultAPI = await request.put('/usuarios').set('Authorization', `Bearer ${token}`).send({ obj_usuario: objUsuario })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(200)
  }, 30000)

  test('Obtener un Usuario - OK', async (done) => {
    const resultAPI = await request.get('/usuarios').set('Authorization', `Bearer ${token}`)
    expect(resultAPI.body.codigo).toEqual('usuario-encontrado')
    expect(resultAPI.statusCode).toEqual(200)
    done()
  })

  test('Eliminar un Usuario - OK', async (done) => {
    const resultAPI = await request.delete('/usuarios').set('Authorization', `Bearer ${token}`)
    expect(resultAPI.body.codigo).toEqual('usuario-eliminado')
    expect(resultAPI.statusCode).toEqual(200)
    done()
  })
})
