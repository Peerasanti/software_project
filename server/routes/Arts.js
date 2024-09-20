const express = require('express');
const router = express.Router();
const { Arts } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddelware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.get("/", async (req, res) => {
    const listOfArts = await Arts.findAll();
    res.json(listOfArts);
}) ;

router.get("/byId/:id", async (req, res) => {
    const id  = req.params.id;
    const art = await Arts.findByPk(id);
    res.json(art);
});

router.get("/byUserId/:UserId", async (req, res) => {
    const userId = req.params.UserId;
    const listOfArt = await Arts.findAll({ where: {UserId: userId}});
    res.json(listOfArt);
});

router.post("/", validateToken, upload.single('img'), async (req, res) => {
    const img = req.file.filename;
    const { title, price, size, desciption } = req.body;
    const artist = req.user.username;
    const userId = req.user.id;
    const art = {
        img, 
        title,
        artist,
        price,
        size, 
        desciption,
        UserId: userId,
    }
    await Arts.create(art);
    res.json(art);
});

router.delete('/delete/:artId', validateToken, async (req, res) => {
    const artId = req.params.artId;
    await Arts.destroy({ where: {id: artId}});
    res.json('Delete Success');
});


module.exports = router;