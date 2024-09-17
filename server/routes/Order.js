const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfOrder = Order.findAll();
    res.json(listOfOrder);
});

router.post('/', validateToken, async (req, res) => {
    const order = req.body;
    await Order.create(order);
    res.json(order);
})

module.exports = router;