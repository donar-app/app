// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 3000

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ================
// SECRET KEY TOKEN
// ================
process.env.SECRET_KEY = process.env.SECRET_KEY || '.xeg7-POitAw7IEHlp6fU8bIq0D6bhoFCqKVL33TU3Xo'

// ================
// SECRET CRYPTO REGISTER
// ================
process.env.SECRET_CRYPTO_REGISTER = '.xeg7-POitAw7IEHlp6fU8bIq0D6bhoFC'

// ================
// CREDENCIALES EMAIL
// ================
// ....
// ....
// ....

// ================
// API IP
// ================
process.env.ACCESS_KEY_IP = '9a64fefe238aec947cbb13c310d81057'

// ================
// Base de datos
// ================
let urlDB

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/donar'
} else {
  urlDB = process.env.URLDB
}

process.env.URLDB = urlDB
