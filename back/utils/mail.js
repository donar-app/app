'use strict'
const nodemailer = require('nodemailer')

const confirmacionDeRegistro = async (destinatario, codigoVerificacion) => {
  const html = `Hola, este es tu codigo de verificacion ${codigoVerificacion}`
  const asunto = 'Confirmacion Registro en donar-app'
  const resultadoEnvio = await enviarCorreo('info@donar-app.com', destinatario, asunto, html)
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
  const resultadoEnvio = await enviarCorreo('comprobante@donar-app.com', destinatario, asunto, html)

  if (!resultadoEnvio) {
    return false
  }

  return true
}

const enviarCorreo = async (remitente, destinatario, asunto, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false,
        ignoreTLS: false,
        requireTLS: true
      }
    })

    return await transporter.sendMail({
      from: remitente,
      to: destinatario,
      subject: asunto,
      html: html
    })
  } catch (error) {
    console.error('error - mail :>> ', error)
    return undefined
  }
}

module.exports = {
  confirmacionDeRegistro,
  enviaNuevaClave,
  confirmacionDePeticion
}
