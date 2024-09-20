const express = require('express');
const router = express.Router();
const { Categorys } = require('../models');

router.get('/', async (req, res) => {
    const listOfCategory = await Categorys.findAll();
    res.json(listOfCategory);
});

router.post('/', async (req, res) => {
    const category = req.body;
    await Categorys.create(category);
    res.json(category);
})

module.exports = router;