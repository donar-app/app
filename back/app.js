const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandlers = require('./middlewares/error');
const {verificaToken} = require('./middlewares/seguridad');
const mongoose = require('mongoose');


require('./config/config');

const indexRouter = require('./routes/index');
const seguridadRouter = require('./routes/seguridadRoute');
const usuarioRouter = require('./routes/usuarioRoute');
const publicacionRouter = require('./routes/publicacion');
const comentarioPublicacionRouter = require('./routes/comentarioPublicacion');
const peticionRouter = require('./routes/peticion');
const calificacionRouter = require('./routes/calificacion');
const contactoRouter = require('./routes/contactoRoute');

const app = express();

// Conexión a la DB
mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, (error, respuesta) => {
    if(error) throw error;

    console.log('Base de datos Online');
})

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({}));
app.use(helmet());
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/', seguridadRouter);
app.use('/contacto', contactoRouter);
app.use('/usuarios', verificaToken, usuarioRouter);
app.use('/publicaciones', verificaToken, publicacionRouter);
app.use('/comentarios-publicaciones', verificaToken, comentarioPublicacionRouter);
app.use('/peticiones', verificaToken, peticionRouter);
app.use('/calificacion', verificaToken, calificacionRouter);


app.use(errorHandlers);



module.exports = app;
