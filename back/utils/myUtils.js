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
  