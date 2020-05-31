/**
 * 
 * @param {Number} cantidad Es el largo del string que deseas
 * @returns {String} Retorna la cadena random de la longitud indicada
 */
const generaStringRandom = (cantidad)=> {
    let randomString="";
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let index = 0; index < cantidad; index++) {
        randomString+= possibleChars.charAt(
            Math.floor(Math.random()*possibleChars.length)
        );
    }

    return randomString;
}

module.exports = {
    generaStringRandom
  };
  