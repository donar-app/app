var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ mensaje: 'bienvenidos', estado: 'ok' })
})

module.exports = router
