/**
 *
 * @param {Number} cantidad Es el largo del string que deseas
 * @returns {String} Retorna la cadena random de la longitud indicada
 */
const generaStringRandom = (cantidad) => {
  let randomString = ''
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let index = 0; index < cantidad; index++) {
    randomString += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    )
  }

  return randomString
}

const seguridadDeClave = (clave) => {
  const regex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')

  if (clave.length < 6 || regex.test(clave) === false) {
    return false
  }
  return true
}

module.exports = {
  generaStringRandom,
  seguridadDeClave
}
