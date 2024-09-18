const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfOrder = await Order.findAll();
    res.json(listOfOrder);
});

router.get('/findByUser', validateToken, async (req, res) => {
    const userId = req.user.id;
    const listOfOrder = await Order.findAll({ where: {UserId: userId}});
    res.json(listOfOrder);
});

router.get('/findByBill/:billId', async (req, res) => {
    const billId = req.params.billId;
    const listOfOrder = await Order.findAll({ where: {BillId: billId}});
    res.json(listOfOrder);
});

router.post('/', validateToken, async (req, res) => {
    const order = req.body;
    const userId = req.user.id;
    order.UserId = userId;
    await Order.create(order);
    res.json(order);
});

router.delete('/:orderId', validateToken, async (req, res) => {
    const orderId = req.params.orderId;
    await Order.destroy({ where: {id: orderId}});
    res.json('Delete Success');
});

module.exports = router;