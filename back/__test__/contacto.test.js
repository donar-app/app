const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const { contactoOK, contactoError } = require('../__mocks__/contacto.mocks')

describe('Endpoints Contacto', () => {
  beforeAll(async (done) => {
    setTimeout(async () => {
      done()
    }, 2000)
  })

  test.each(contactoOK)('Registro de Contacto - OK - %#', async (contacto) => {
    const { obj_contacto: objContacto, code_result: codeResult } = contacto
    const resultAPI = await request.post('/contactos').send({ obj_contacto: objContacto })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(201)
  }, 30000)

  test.each(contactoError)('Registro de Contacto - ERROR - %#', async (contacto) => {
    const { obj_contacto: objContacto, code_result: codeResult } = contacto
    const resultAPI = await request.post('/contactos').send({ obj_contacto: objContacto })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(200)
  }, 30000)
})
