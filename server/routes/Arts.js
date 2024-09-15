const express = require('express');
const router = express.Router();
const { Arts } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get("/", async (req, res) => {
    const listOfArts = await Arts.findAll();
    res.json(listOfArts);
}) ;

router.get("/byId/:id", async (req, res) => {
    const id  = req.params.id;
    const art = await Arts.findByPk(id);
    res.json(art);
});

router.get("/:UserId", async (req, res) => {
    const userId = req.params.UserId;
    const art = await Arts.findAll({ where: {UserId: userId}});
    res.json(art);
});

router.post("/", validateToken, async (req, res) => {
    const art = req.body;
    await Arts.create(art);
    res.json(art);
});


module.exports = router