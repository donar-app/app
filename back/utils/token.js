const jsonwebtoken = require('jsonwebtoken');
const envDev = require('../config');

export const createToken = async (objToken ) => {
  const token = await jwt.sign(
    {
      iss: 'donar',
      sub: objToken.sub,
      aud: objToken.aud,
      id: objToken.id,
      alias: objToken.alias,
      rol: objToken.role
    },
    process.env.secretKey || envDev.secretKey,
    { expiresIn: '15min' }
  )
  return token
}

export const validToken = async (authorization) => {
  try {
    if (!authorization || authorization.length < 1) {
      return null
    }

    var decoded = await jwt.verify(authorization, process.env.secretKeyJWT || secretKeyJWT.dev)

    if (typeof decoded !== 'object') {
      return null
    }

    if (!decoded.hasOwnProperty('id') || decoded.hasOwnProperty('role') || decoded.hasOwnProperty('alias')) {
        
    }
    decoded.hasOwnProperty('role'); 
    decoded.hasOwnProperty('alias'); 

    return validInterface(decoded)
  } catch (ex) {
    return null
  }
}
