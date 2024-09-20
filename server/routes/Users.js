const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddelware');


const {sign} = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const listOfUser = await Users.findAll();
    res.json(listOfUser);
});

router.get('/byId/:id', async(req, res) => {
    const userId = req.params.id;
    const user = await Users.findByPk(userId);
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10).then((hash) => {
        Users.create({
            username: user.username,
            password: hash,
            email: user.email,
            tel: user.tel,
            address: user.address
        });
        res.json("SUCCESS!!");
    });
});

router.post("/login", async (req, res) => {
    const validateUser = req.body;
    const user = await Users.findOne({ where: {username: validateUser.username} });
    if(!user) {
        return res.json({error: "User doesn't exist"});
    }
    bcrypt.compare(validateUser.password, user.password).then(async (match) => {
        if(!match) {
            return res.json({error: "Wrong Username & Password Combination"});
        }
        const accessToken = sign({username: user.username, id: user.id}, "important_secret");
        console.log("Logged in!!!");
        res.json({token: accessToken, username: user.username, id: user.id});
    });
});

router.get("/user", validateToken, async (req, res) => {
    res.json(req.user);
});

router.get("/basicInfo/:id", async (req, res) => {
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id, {attributes: {exclude: ["password"]}});
    res.json(basicInfo);
});

router.put('/user', validateToken, async (req, res) => {
    const { username, password, email, tel, address } = req.body;
    const userId = req.user.id;
    await Users.update({ username, password, email, tel, address }, { where: { id: userId } });
    res.json({ success: true });
  });

module.exports = router;