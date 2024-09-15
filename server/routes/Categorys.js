const express = require('express');
const router = express.Router();
const { Categorys } = require('../models');

router.get('/', async (req, res) => {
    const listOfCategory = Categorys.findAll();
    res.json(listOfCategory);
});

module.exports = router;