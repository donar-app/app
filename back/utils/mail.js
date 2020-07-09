'use strict'
const nodemailer = require('nodemailer')

const confirmacionDeRegistro = async (destinatario, codigoVerificacion) => {
  const html = 'Hola' + codigoVerificacion
  const asunto = 'asd'
  const resultadoEnvio = await enviarCorreo('registro@donar-app.com', destinatario, asunto, html)
  if (!resultadoEnvio) {
    return false
  }

  return true
}

const enviaNuevaClave = async (destinatario) => {
  const html = 'Hola'
  const asunto = 'asd'
  const resultadoEnvio = await enviarCorreo('seguridad@donar-app.com', destinatario, asunto, html)
  if (!resultadoEnvio) {
    return false
  }

  return true
}

const confirmacionDePeticion = async (destinatario) => {
  const html = 'Hola'
  const asunto = 'asd'
  const resultadoEnvio = await enviarCorreo('confirmacion@donar-app.com', destinatario, asunto, html)

  if (!resultadoEnvio) {
    return false
  }

  return true
}

const enviarCorreo = async (remitente, destinatario, asunto, html) => {
  /*
  const transporter = nodemailer.createTransport({
    host: '192.168.0.15',
    port: 25,
    secure: false
  })

  return await transporter.sendMail({
    from: remitente,
    to: destinatario,
    subject: asunto,
    html: html
  })
  */
  return new Promise((resolve, reject) => {
    resolve('asd')
  })
}

module.exports = {
  confirmacionDeRegistro,
  enviaNuevaClave,
  confirmacionDePeticion
}
