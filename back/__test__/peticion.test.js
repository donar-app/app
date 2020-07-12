const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const { crearPeticionOK, crearPeticionError } = require('../__mocks__/peticion.mocks')

describe('Endpoints Peticion', () => {
  beforeAll(async (done) => {
    setTimeout(async () => {
      done()
    }, 2000)
  })

  test.each(crearPeticionOK)('Creaacion de Peticion - OK - %#', async (peticion) => {
    const { obj_peticion: objPeticion, code_result: codeResult } = peticion
    const resultAPI = await request.post('/peticiones').send({ obj_peticion: objPeticion })
    expect(resultAPI.body.codigo).toEqual(codeResult)
    expect(resultAPI.statusCode).toEqual(201)
  }, 30000)
})
