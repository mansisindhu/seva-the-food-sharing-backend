const express = require("express");
const Register = require("../models/NGO.model");

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = await Register.create(req.body);
    return res.status(201).send({ user });
});

router.get("/register", async (req, res) => {
    const users = await Register.find({}).lean().exec();
    return res.status(200).send({ users });
})

module.exports = router;