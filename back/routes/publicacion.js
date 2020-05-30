'use strict'

const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/async-handler');

const { getPublication, getAllPublications, createPublication, updatePublication, deletePublication } = require('../controllers/publicacion');


router.get('/todas', asyncHandler(async (req, res, next) => {
    const data = await getAllPublications();
    res.status(200).json({ data });
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
    const data = await getPublication(req.params.id);
    res.status(200).json({ data })
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const data = await createPublication(req.body);
    res.status(200).json({ data });
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
    const data = await updatePublication(req.params.id, req.body);
    res.status(200).json({ data });
}))

router.delete('/', asyncHandler(async (req, res, next) => {
    const data = await deletePublication(req.params.id);
    res.status(200).json({ data });
}))


module.exports = router;