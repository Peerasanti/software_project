const express = require('express');
const router = express.Router();
const { Bill } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfBill = await Bill.findAll();
    res.json(listOfBill);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const bill = await Bill.findByPk(id);
    res.json(bill);
});

router.get('/findByUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const listOfBill = await Bill.findAll({ where: {UserId: userId}});
    res.json(listOfBill);
});

router.post('/', validateToken, async (req, res) => {
    const bill = req.body;
    const userId = req.user.id;
    bill.UserId = userId;
    const newBill = await Bill.create(bill);
    res.json(newBill);
});

module.exports = router;