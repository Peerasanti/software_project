const express = require('express');
const router = express.Router();
const { Art } = require('../models');

router.get("/", async (req, res) => {
    const listOfArts = await Art.findAll();
    res.json(listOfArts);
}) ;

router.get("/byId/:id", async (req, res) => {
    const id  = req.params.id;
    const art = await Art.findByPk(id);
    res.json(art);
});

router.get("/:UserId", async (req, res) => {
    const userId = req.params.UserId;
    const art = await Art.findAll({ where: {UserId: userId}});
    res.json(art);
})

router.post("/", async (req, res) => {
    const art = req.body;
    await Art.create(art);
    res.json(art);
});


module.exports = router