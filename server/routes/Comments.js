const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/', async (req, res) => {
    const listOfComments = Comments.findAll();
    res.json(listOfComments);
})

router.get('/:artId', async (req, res) => {
    const artId = req.params.artId;
    const comments = await Comments.findAll({ where: {ArtId: artId}});
    res.json(comments);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const comments = await Comments.findAll({ where: {UserId: userId}});
    res.json(comments);
})

router.post('/', async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router