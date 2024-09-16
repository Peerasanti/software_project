const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfComments = Comments.findAll();
    res.json(listOfComments);
});

router.get('/:artId', async (req, res) => {
    const artId = req.params.artId;
    const comments = await Comments.findAll({ where: {ArtId: artId}});
    res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    //--------------------------knight--------------------------
    //comment.ArtId = req.arts.id;
    //--------------------------knight--------------------------
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;