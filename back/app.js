const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const errorHandlers = require('./middlewares/error')
const { verificaToken } = require('./middlewares/seguridad')

require('./config/config')

const indexRouter = require('./routes/indexRoute')
const usuarioRouter = require('./routes/usuarioRoute')
const publicacionRouter = require('./routes/publicacionRoute')
const preguntaPublicacionRouter = require('./routes/preguntaPublicacionRoute')
const peticionRouter = require('./routes/peticionRoute')
const calificacionRouter = require('./routes/calificacionRoute')
const contactoRouter = require('./routes/contactoRoute')

const app = express()

// Conexión a la DB
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error, respuesta) => {
  if (error) throw error

  console.log('Base de datos Online')
})

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({}))
app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/contacto', contactoRouter)
app.use('/usuarios', verificaToken, usuarioRouter)
app.use('/publicaciones', publicacionRouter)
app.use('/preguntas-publicaciones', preguntaPublicacionRouter)
app.use('/peticiones', verificaToken, peticionRouter)
app.use('/calificacion', verificaToken, calificacionRouter)

app.use(errorHandlers)

module.exports = app
