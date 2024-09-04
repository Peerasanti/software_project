const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get('/', async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.get('/ById/:{id}', async (req, res) => {
    const user = await Users.findByPK(id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = req.body;
    await Users.create(user);
    res.json(user);
});

module.exports = router;