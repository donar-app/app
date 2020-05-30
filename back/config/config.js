// ================
// Puerto
// ================
process.env.PORT = process.env.PORT || 3000

// ================
// Entorno
// ================
process.env.NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// SECRET KEY TOKEN
// ================
process.env.SECRETKEY = process.env.SECRETKEY = process.env.SECRETKEY || ".xeg7-POitAw7IEHlp6fU8bIq0D6bhoFCqKVL33TU3Xo";

// ================
// Base de datos
// ================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/donar';
} else {
    urlDB = process.env.URLDB;
}

process.env.URLDB = urlDB;