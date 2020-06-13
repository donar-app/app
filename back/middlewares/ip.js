let ips = []
const axios = require('axios')
const ipRepository = require('../repository/ipRepository')

const verificaIP = async (req, res, next) => {
  const ip = req.ip
  if (ips.length === 0) {
    ips = await ipRepository.obtenerTodas()
  }
  if (req.cookies.pais) {
    req.body.cookie_pais = req.cookies.pais
    return next()
  }
  const resultado = ips.filter((unaIP) => unaIP.valor === ip)
  if (resultado.length === 1) {
    req.body.cookie_pais = resultado[0].pais
    res.cookie('pais', req.body.cookie_pais)
    return next()
  }
  axios(`http://api.ipstack.com/${ip}?access_key=${process.env.ACCESS_KEY_IP}`)
    .then((response) => response.data)
    .catch((error) => console.log('error.message >> ', error.message))
    .then(async (data) => {
      ips.push({ pais: data.country_code, ip: data.ip })
      await ipRepository.guardar({
        pais: data.country_code,
        region: data.region_name,
        ciudad: data.city,
        valor: data.ip,
        creado_en: new Date(
          new Date().toLocaleString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires'
          }))
      })
      req.body.cookie_pais = data.country_code
      res.cookie('pais', req.body.cookie_pais)
      return next()
    })
}

module.exports = {
  verificaIP
}
