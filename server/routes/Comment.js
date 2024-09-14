const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.get('/', async (req, res) => {
    const listOfComments = Comment.findAll();
    res.json(listOfComments);
})

router.get('/:artId', async (req, res) => {
    const artId = req.params.artId;
    const comments = await Comment.findAll({ where: {ArtId: artId}});
    res.json(comments);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const comments = await Comment.findAll({ where: {UserId: userId}});
    res.json(comments);
})

router.post('/', async (req, res) => {
    const comment = req.body;
    await Comment.create(comment);
    res.json(comment);
})

module.exports = router