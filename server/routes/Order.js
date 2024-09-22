const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfOrder = await Order.findAll();
    res.json(listOfOrder);
});

router.get('/findByUser/:userId', validateToken, async (req, res) => {
    const userId = req.params.userId;
    const listOfOrder = await Order.findAll({ where: {UserId: userId, BillId: null, status: false}});
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

router.put('/update/:orderId', validateToken, async (req, res) => {
    const orderId = req.params.orderId;
    const {billId, status} = req.body;
    const newOrder = await Order.update({BillId:billId, status:status}, { where: {id: orderId}});
    res.json(newOrder);
});

module.exports = router;