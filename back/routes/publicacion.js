'use strict'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');


router.get('/todas', asyncHandler(async (req, res, next) => {
  res.send('Estas listando todas las publicaciones');
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  res.send('estas listando una publicacion');
}))

router.post('/', asyncHandler(async (req, res, next) => {
  res.send('estas creando una publicacion');
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  res.send('estas modificando una publicacion');
}))

router.delete('/', asyncHandler(async (req, res, next) => {
  res.send('estas eliminando una publicacion');
}))


module.exports = router;