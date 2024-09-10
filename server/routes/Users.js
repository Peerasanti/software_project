const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddelware');


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
    const validateUser = req.body;
    const user = await Users.findOne({ where: {username: validateUser.username} });
    console.log(user)
    if(!user) {
        return res.json({error: "User doesn't exist"});
    }
    bcrypt.compare(validateUser.password, user.password).then(async (match) => {
        if(!match) {
            return res.json({error: "Wrong Username & Password Combination"});
        }
        const accessToken = sign({username: user.username, id: user.id}, "important_secret")
        console.log("Logged in!!!");
        res.json(accessToken);
    });
});

router.get("/user", validateToken, (req, res) => {
    res.json(req.user);
});


module.exports = router;