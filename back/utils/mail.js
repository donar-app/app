'use strict'
const nodemailer = require('nodemailer')

const confirmacionDeCuenta = async (remitente, destinatario) => {
  const html = 'Hola'
  const asunto = 'asd'
  await enviarCorreo(remitente, destinatario, asunto, html)
}

const olvidoDeClave = async (remitente, destinatario) => {
  const html = 'Hola'
  const asunto = 'asd'
  await enviarCorreo(remitente, destinatario, asunto, html)
}

const confirmacionDePeticion = async (remitente, destinatario) => {
  const html = 'Hola'
  const asunto = 'asd'
  await enviarCorreo(remitente, destinatario, asunto, html)
}

const enviarCorreo = async (remitente, destinatario, asunto, html) => {
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
}

module.exports = {
  confirmacionDeCuenta,
  olvidoDeClave,
  confirmacionDePeticion
}
