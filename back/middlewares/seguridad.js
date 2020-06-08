const jwt = require('jsonwebtoken')
const { responseJSON } = require('../utils/responseJSON')

const setTokenEnCabecera = (res, token) => {
  res.set({
    Authorization: `${token}`,
    'Accept-Charset': 'utf-8',
    'Access-Control-Expose-Headers': 'Authorization'
  })
}

const crearToken = async (objToken) => {
  return await jwt.sign(
    {
      iss: 'donar',
      id: objToken.id,
      alias: objToken.alias,
      pais: objToken.pais,
      ciudad: objToken.ciudad
    },
    process.env.SECRETKEY,
    { expiresIn: '15min' }
  )
}

const verificaToken = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(200).json(responseJSON(false, 'token_nulo', 'No Autorizado', []))
  }

  const [tipo, token] = authorization.split(' ')

  if (!tipo || !token || tipo !== 'Bearer') {
    return res.status(401).json(responseJSON(false, 'token_erroneo', 'No Autorizado', []))
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRETKEY)

    if (!decoded) {
      return res.status(401).json(responseJSON(false, 'token_no_valido', 'No Autorizado', []))
    }

    const id = Object.prototype.hasOwnProperty.call(decoded, 'id')
    const alias = Object.prototype.hasOwnProperty.call(decoded, 'alias')
    const ciudad = Object.prototype.hasOwnProperty.call(decoded, 'ciudad')
    const pais = Object.prototype.hasOwnProperty.call(decoded, 'pais')

    if (!id || !alias || !ciudad || !pais) {
      return res.status(401).json(responseJSON(false, 'token_mal_generado', 'No Autorizado', []))
    }

    req.body.jwt_usuario_id = decoded.id
    req.body.jwt_usuario_alias = decoded.alias
    req.body.jwt_usuario_ciudad = decoded.ciudad
    req.body.jwt_usuario_pais = decoded.pais

    const newToken = await crearToken({ sub: 'update', aud: 'web', id: decoded.id, alias: decoded.alias, ciudad: decoded.ciudad, pais: decoded.pais })

    await setTokenEnCabecera(res, newToken)
    next()
  } catch (error) {
    return res.status(401).json(responseJSON(false, 'token_no_valido', 'No Autorizado', []))
  }
}

const verificaCredenciales = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(200).json(responseJSON(false, 'autentificacion_nula', 'Autentificacion nula', []))
  }

  const [tipo, credencialesEnbase64] = authorization.split(' ')

  if (!tipo || !credencialesEnbase64 || tipo !== 'Basic') {
    return res.status(200).json(responseJSON(false, 'autentificacion_erronea', 'Autentificacion erronea', []))
  }

  const [alias, clave] = Buffer.from(credencialesEnbase64, 'base64').toString('utf8').split(':')

  if (!alias || !clave) {
    return res.status(200).json(responseJSON(false, 'credenciales_erroneas', 'Credenciales no encontradas', []))
  }

  req.body.credencial_alias = alias
  req.body.credencial_clave = clave
  next()
}

module.exports = {
  setTokenEnCabecera, crearToken, verificaToken, verificaCredenciales
}
