const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const errorHandlers = require('./middlewares/error')
const { verificaToken } = require('./middlewares/seguridad')
const { verificaIP } = require('./middlewares/ip')
require('dotenv').config({ path: '.env' })

const indexRouter = require('./routes/indexRoute')
const usuarioRouter = require('./routes/usuarioRoute')
const publicacionRouter = require('./routes/publicacionRoute')
const preguntaRouter = require('./routes/preguntaRoute')
const peticionRouter = require('./routes/peticionRoute')
const contactoRouter = require('./routes/contactoRoute')

const app = express()

app.use('/uploads', express.static(`${__dirname}\\uploads`))

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
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json({ limit: '10mb' }))

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
// app.use(verificaIP)

app.use('/', indexRouter)
app.use('/contacto', contactoRouter)
app.use('/usuarios', verificaToken, usuarioRouter)
app.use('/publicaciones', publicacionRouter)
app.use('/preguntas', preguntaRouter)
app.use('/peticiones', verificaToken, peticionRouter)

app.use(errorHandlers)

module.exports = app
