const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');

router.get('/', async (req, res) => {
    const listOfComments = await Comments.findAll();
    res.json(listOfComments);
});

router.get('/:artId', async (req, res) => {
    const artId = req.params.artId;
    const comments = await Comments.findAll({ where: {ArtId: artId}});
    res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    const userName = req.user.username;
    const userId = req.user.id;
    comment.userName = userName;
    comment.UserId = userId;
    await Comments.create(comment);
    res.json(comment);
});

router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({ where: {id: commentId}});
    res.json("Delete Success");
})

module.exports = router;