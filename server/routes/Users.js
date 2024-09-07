const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');


const {sign} = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.json("route user");
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
    const { username, password } = req.body;

    const user = await Users.findOne({ where: {username: username}});
    if(!user) res.json({error: "User doesn't exist"});
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "Wrong Username & Password Combination"});

        const accessToken = sign({username: user.username, id: user.id}, "important_secret")
        res.json(accessToken);
    });
    
});


module.exports = router;